import { Component, Input, OnInit } from '@angular/core';
import { MovieRestService } from 'src/app/shared/movie-rest.service';
import { ICompressedMovie } from 'src/app/shared/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  @Input()
  movies : ICompressedMovie[];

  constructor() { }

  ngOnInit(): void {
  }

}
