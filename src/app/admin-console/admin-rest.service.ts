import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../app.properties';

@Injectable({
  providedIn: 'root'
})
export class AdminRestService {

  constructor(private http: HttpClient) { }

  fetchMovies(year : number, quantity : number) : Observable<any> {
    let url : string = baseUrl + "/fetch/movies/" + year + "/" + quantity;

    return this.http.get<any>(url);
  }
}
