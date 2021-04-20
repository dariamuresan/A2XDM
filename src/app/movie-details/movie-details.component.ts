import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieRestService } from '../shared/movie-rest.service';
import { IMovie, IGenre, IActor } from '../shared/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movie : IMovie;

  movieGenres : string[] = [];
  movieActors : string[] = [];

  subscription : Subscription;

  constructor(private movieService : MovieRestService, 
            private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.movieService.getMovie(this.activatedRoute.snapshot.params['id']).subscribe(movie => {
      this.movie = movie;
      this.getGenres(this.movie);
    });
  }

  addToFavourites(movie : IMovie) {
    console.log("I will add it to favourites");
  }

  getGenres(movie : IMovie) {
    let genres : IGenre[] = movie.genres;

    for(let genre of genres) {
      this.movieGenres.push(genre.name);
    }
  }

  getActors(movie : IMovie) {
    let actors : IActor[] = movie.actors;

    for(let actor of actors) {
      this.movieActors.push(actor.name);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
