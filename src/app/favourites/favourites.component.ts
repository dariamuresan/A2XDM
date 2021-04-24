import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieRestService } from '../shared/movie-rest.service';
import { ICompressedMovie } from '../shared/movie.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  movies : ICompressedMovie[] = [];

  username : string = "daria";

  subscription : Subscription;

  constructor(private movieService : MovieRestService) { }

  ngOnInit(): void {
    this.subscription = this.movieService.getFavouritesMovies(this.username).subscribe(movies => {
      this.movies = movies;
    })
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}
