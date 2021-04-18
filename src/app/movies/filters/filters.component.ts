import { Component, OnInit } from '@angular/core';
import { GENRES, RATING } from './filters.data';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  genres : string[] = GENRES;
  rating : string[] = RATING;

  constructor() { }

  ngOnInit(): void {
  }

}
