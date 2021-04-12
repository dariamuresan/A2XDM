import { Component, Input, OnInit } from '@angular/core';
import { ICompressedMovie } from '../movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input()
  movie : ICompressedMovie;

  constructor() { }

  ngOnInit(): void {
  }

}
