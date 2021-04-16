import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filter1 : string[] = ["Genres", "comedy", "drama", "horror", "action", "adventure", "comedy", "drama", "horror", "action", "adventure"];
  filter2 : string[] = ["Min. Rating", "1", "2", "3", "4", "5"];

  constructor() { }

  ngOnInit(): void {
  }

}
