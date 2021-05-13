import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { MovieRestService } from '../shared/movie-rest.service';
import { IMovie, IGenre, IActor } from '../shared/movie.model';
import { IUser } from '../user-profile/user.model';
import { IReview } from './reviews/review.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  username : string;

  movie : IMovie;

  movieGenres : string[] = [];
  movieActors : string[] = [];

  reviews : IReview[];

  reviewsArrived : boolean = false;
  isFavourite : boolean = false;

  movieSubscription : Subscription;
  reviewsSubscription : Subscription;
  favouriteSubscription : Subscription;

  constructor(private movieService : MovieRestService, 
            private activatedRoute: ActivatedRoute,
            private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    let movieId = this.activatedRoute.snapshot.params['id'];

    this.username = this.authService.getCurrentLoggedUser();

    this.movieSubscription = this.movieService.getMovie(movieId).subscribe(movie => {
      this.movie = movie;
      this.getGenres(this.movie);
      this.getActors(this.movie);
    });

    this.reviewsSubscription = this.movieService.getMovieReviews(movieId).subscribe(reviews => {
      this.reviews = reviews;
      this.reviewsArrived = true;
    });

    if(this.username != null)
      this.favouriteSubscription = this.movieService.checkIfFavouriteMovie(movieId, this.username).subscribe(response => {
        this.isFavourite = response;
      });
  }

  onAddToFavourites(movieId : string) {
    if(this.isFavourite) {
      this.removeFromFavourites(movieId);
    }
    else
      this.addToFavourites(movieId);
  }

  removeFromFavourites(movieId : string) {
    this.movieService.removeMovieFromFavourites(movieId, this.username).subscribe(() => {this.isFavourite = false;});
  }

  addToFavourites(movieId : string) {
    this.movieService.addMovieToFavourites(movieId, this.username).subscribe(() => {this.isFavourite = true;});
  }

  getGenres(movie : IMovie) {
    let genres : IGenre[] = movie.genres;

    for(let genre of genres) {
      this.movieGenres.push(genre.name);
    }
  }

  getActors(movie : IMovie) {
    let actors : IActor[] = movie.actors;

    for(let i = 0; i < 10; i++) {
      this.movieActors.push(actors[i].name);
    }
  }

  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
    this.reviewsSubscription.unsubscribe();
  }

}
