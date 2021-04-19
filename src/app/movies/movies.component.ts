import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
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

  movies : ICompressedMovie[] = [];

  genresActiveFilters : string[] = [];
  ratingActiveFilters : string = "";
  
  subscription:Subscription;

  pageSubject : Subject<number> = new Subject<number>();
  
  constructor(private filterService : FilterService, private movieService : MovieRestService) { }

  ngOnInit(): void {
    this.getCompressedMovies(this.page, "newest", this.genresActiveFilters, this.ratingActiveFilters);

    let requestObservable : Observable<any> = merge(
        this.pageSubject.pipe(
            tap(
                increment => {
                    this.page += increment;
                }
            )
        ),
        this.filterService.genresSubject.pipe(
            tap(
                (genresFilters : string[]) => {
                    this.genresActiveFilters = genresFilters;
                }
            )
        ),
        this.filterService.ratingSubject.pipe(
            tap(
                (ratingFilters : string) => {
                    this.ratingActiveFilters = ratingFilters;
                }
            )
        )
    ).pipe(
        switchMap(
            (value:any, index:number) => {
                return this.getCompressedMovies(this.page, "newest", this.genresActiveFilters, this.ratingActiveFilters);
            }
        )
    );
    this.subscription = requestObservable.subscribe(movies => {this.movies = movies});
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  private getCompressedMovies(page : number, sortMoethod : string, genres : string[], minRating : string) {
    return this.movieService.getCompressedMovies(page, sortMoethod, genres, minRating);
  }

  onNextPage() {
    this.pageSubject.next(1);
  }

  onPreviousPage() {
    this.pageSubject.next(-1);
  }

}