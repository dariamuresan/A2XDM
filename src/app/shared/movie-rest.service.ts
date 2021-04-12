import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../app.properties';
import { ICompressedMovie, IGenre } from './movie.model';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class MovieRestService {
  constructor(private http: HttpClient) { }

  getCompressedMovies(page : number, genres : string[], category : string) : Observable<Array<ICompressedMovie>> {
    let url : string = baseUrl + "/movies/" + category + "/" + page + "?genres=";
    
    for(let c of category)
      url += c;

    return this.http.get<Array<ICompressedMovie>>(url);
  }
}
