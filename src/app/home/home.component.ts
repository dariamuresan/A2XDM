import { Component, OnInit } from '@angular/core';

export interface HomePageMovieCategory {
  title : string,
  sortMethod : string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
