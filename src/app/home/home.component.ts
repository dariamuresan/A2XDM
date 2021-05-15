import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { UserCurrentSession } from '../shared/user.model';

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

  userCurrentSession: UserCurrentSession;

  topRated : HomePageMovieCategory = { 
    title: 'Top rated...',
    sortMethod: 'topRated',
    generes: ''
  };

  newest : HomePageMovieCategory = { 
    title: 'Newest...',
    sortMethod: 'newest',
    generes: ''
  };

  topGeneres: HomePageMovieCategory[] = [{
    title : 'Adventure...',
    sortMethod : 'topRated',
    generes: 'adventure'}, 
  {
    title : 'Action...',
    sortMethod : 'topRated',
    generes: 'action'},
  {
    title : 'Drama...',
    sortMethod : 'topRated',
    generes: 'drama'}, 
  {
    title : 'Comedy...',
    sortMethod : 'topRated',
    generes: 'comedy'
  }];

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.userSubject.subscribe(response => {
      this.userCurrentSession = response;
    })
  }

}
