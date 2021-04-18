import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService } from '../shared/filter.service';
import { MovieRestService } from '../shared/movie-rest.service';
import { ICompressedMovie } from '../shared/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  page : number = 0;

  movies : ICompressedMovie[];

  genresActiveFilters : string[] = [];
  ratingActiveFilters : string = "";

  genresSubscription : Subscription;
  ratingSubscription : Subscription;

  constructor(private filterService : FilterService, private movieService : MovieRestService) { }

  ngOnInit(): void {
    this.getCompressedMovies(this.page, "topRated", this.genresActiveFilters, this.ratingActiveFilters);
    this.genresSubscription = this.filterService.genresSubject
      .subscribe(genresFilters => {this.genresActiveFilters = genresFilters; console.log(this.genresActiveFilters); 
                                  this.getCompressedMovies(this.page, "topRated", this.genresActiveFilters, this.ratingActiveFilters);});
    this.ratingSubscription = this.filterService.ratingSubject
      .subscribe(ratingFilters => {this.ratingActiveFilters = ratingFilters;
                                  this.getCompressedMovies(this.page, "topRated", this.genresActiveFilters, this.ratingActiveFilters);})
  }

  ngOnDestroy(): void{
    this.genresSubscription.unsubscribe();
    this.ratingSubscription.unsubscribe();
  }

  private getCompressedMovies(page : number, sortMoethod : string, genres : string[], minRating : string) {
    this.movieService.getCompressedMovies(page, sortMoethod, genres, minRating)
      .subscribe(movies => {this.movies = movies});
  }

}
