import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Input()
  filters : string[];

  title : string;

  constructor() { }

  ngOnInit(): void {
    this.title = this.filters[0];
    this.filters = this.filters.slice(1);
  }

}
