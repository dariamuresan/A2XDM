import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl } from '../app.properties';
import { IUser } from '../user-profile/user.model';
import { LoginResponse, User, UserCurrentSession } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  private user: UserCurrentSession = null;

  userSubject: Subject<UserCurrentSession> = new BehaviorSubject<UserCurrentSession>(null);

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
    let url: string = baseUrl + "/api/login";
    return this.httpClient.post<LoginResponse>(url, {
      username: username,
      password: password
    }).pipe(
      tap((response: LoginResponse) => {
        this.handleLoginResponse(response, username);
      })
    );
  }

  register(user: IUser): Observable<LoginResponse>{
    let url: string = baseUrl + "/api/register";
    return this.httpClient.post<LoginResponse>(url, user).pipe(
      tap((response: LoginResponse) => {
        this.handleLoginResponse(response, user.username);
      })
    );
  }

  logout(): void{
    this.user = null;
    this.userSubject.next(null);
  }

}
