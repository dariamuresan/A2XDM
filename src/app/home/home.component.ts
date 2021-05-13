import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';

export interface HomePageMovieCategory {
  title : string,
  sortMethod : string;
  generes?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  username : string = null;

  topRated : HomePageMovieCategory = { 
    title: 'Top rated',
    sortMethod: 'topRated'
  };

  byTitle : HomePageMovieCategory = { 
    title: 'By Title',
    sortMethod: 'byTitle'
  };

  newest : HomePageMovieCategory = { 
    title: 'Newest',
    sortMethod: 'newest'
  };

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.username = this.authService.getCurrentLoggedUser();
  }

}
