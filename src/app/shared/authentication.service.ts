import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl } from '../app.properties';
import { IUser } from '../user-profile/user.model';
import { LoginResponse, UserCurrentSession, UserResponse } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  private user: UserCurrentSession = null;

  userSubject: Subject<UserCurrentSession> = new BehaviorSubject<UserCurrentSession>(null);

  getUserByUsername(username: string) : Observable<UserResponse> {
    let url: string = baseUrl + "/users/" + username;

    let user: IUser;

    return this.httpClient.get<UserResponse>(url);
  }

  getCurrentLoggedUser() : string {
    return this.user.username;
  }

  private handleLoginResponse(response: LoginResponse, username: string){
    if(response.success){
      this.userSubject.next({username: username, token: response.token});
      this.user = {username: username, token: response.token};
    }
  }

  login(username: string, password: string): Observable<LoginResponse>{
    let url: string = baseUrl + "/users/login";
    return this.httpClient.post<LoginResponse>(url, {
      username: username,
      password: password
    }).pipe(
      tap((response: LoginResponse) => {
        this.handleLoginResponse(response, username);
      })
    );
  }

  register(user: UserResponse): Observable<LoginResponse>{
    let url: string = baseUrl + "/users/register";
    return this.httpClient.post<LoginResponse>(url, user).pipe(
      tap((response: LoginResponse) => {
        this.handleLoginResponse(response, user.username);
      })
    );
  }

  editUser(user: UserResponse): Observable<any> {
    let url: string = baseUrl + "/users/" + user.username;

    return this.httpClient.put<any>(url, user);
  }

  logout(): void{
    this.user = null;
    this.userSubject.next(null);
  }

}
