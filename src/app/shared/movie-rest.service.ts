import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../app.properties';
import { ICompressedMovie, IGenre, IMovie } from './movie.model';
import {HttpClient, HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class MovieRestService {
  constructor(private http: HttpClient) { }

  getCompressedMovies(page : number, sortMethod : string, genres?: string[], minRating?: string) : Observable<Array<ICompressedMovie>> {
    let url : string = baseUrl + "/movies/" + sortMethod + "/" + page;

    let params = new HttpParams()
      .set("genres", "")
      .set("minRating", "")

    if ((genres != null) && (genres.length != 0)) {
        params = params.set('genres', genres.join(","));
    }
    
    if ((minRating != null) && (minRating !== "")) {
        params = params.set('minRating', minRating);
    }

    return this.http.get<Array<ICompressedMovie>>(url, {
      params: params
    });
  }

  getMovie(id : string) : Observable<IMovie> {
    let url : string = baseUrl + "/movies/" + id;

    return this.http.get<IMovie>(url);
  }
}
