import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../app.properties';
import { IUser } from '../user-profile/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private http: HttpClient) { }

  getUserInfo(username: string): Observable<IUser>{
    let url: string = baseUrl + "/api/" + username;

    return this.http.get<IUser>(url);
  }

}
