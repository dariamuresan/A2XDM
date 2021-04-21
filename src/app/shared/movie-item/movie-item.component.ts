import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICompressedMovie } from '../movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input()
  movie : ICompressedMovie;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  openMovie(movie : ICompressedMovie): Promise<boolean> {
    return this.router.navigate(['movie-details', movie.id]);
  }

}
