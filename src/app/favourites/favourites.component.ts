import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { MovieRestService } from '../shared/movie-rest.service';
import { ICompressedMovie } from '../shared/movie.model';
import { UserCurrentSession } from '../shared/user.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  movies : ICompressedMovie[] = [];

  username : string = null;

  subscription : Subscription;
  userSubscription: Subscription;

  constructor(private movieService : MovieRestService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    
    this.username = this.authService.getCurrentLoggedUser();
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: UserCurrentSession) => {
        if(!user)
          this.username = null;
        else
          this.username = user.username;
      }
    )
    
    this.subscription = this.movieService.getFavouritesMovies(this.username).subscribe(movies => {
      this.movies = movies;
    })
    
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
