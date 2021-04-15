import { Component, OnInit } from '@angular/core';
import { MovieRestService } from 'src/app/shared/movie-rest.service';
import { ICompressedMovie } from 'src/app/shared/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  movies : ICompressedMovie[];

  constructor(private movieService : MovieRestService) { }

  ngOnInit(): void {
    this.movieService.getCompressedMovies(0, ["action"], "topRated")
      .subscribe(movies => {this.movies = movies});
  }

}
