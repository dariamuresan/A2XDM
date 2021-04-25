import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MovieRestService } from '../shared/movie-rest.service';
import { ICompressedMovie } from '../shared/movie.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  movies : ICompressedMovie[] = [];

  constructor(private movieService : MovieRestService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params : Params) => {
        let searchKey = params['searchKey'];
        return this.movieService.getSearchedMovies(searchKey, 0);
      })
    ).subscribe(movies => {
      this.movies = movies;
    });
  }

}
