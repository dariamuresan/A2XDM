import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-movie-list',
  templateUrl: './inline-movie-list.component.html',
  styleUrls: ['./inline-movie-list.component.css']
})
export class InlineMovieListComponent implements OnInit {
  titles : string[] = ["Movie 1", "Movie 2", "Movie 3", "Movie 1", "Movie 2", "Movie 3", "Movie 1", "moviw 10", "inca unul si gata"];

  @Input()
  componentId : string;

  constructor() {
  }

  getId() : string {
    return "carousel" + this.componentId;
  }

  getReference(id : string) : string {
    return "#carousel" + id;
  }

  ngOnInit(): void {
  }

}
