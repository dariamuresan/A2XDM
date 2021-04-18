import { Component, Input, OnInit } from '@angular/core';
import { MovieRestService } from 'src/app/shared/movie-rest.service';
import { ICompressedMovie } from 'src/app/shared/movie.model';

@Component({
  selector: 'app-inline-movie-list',
  templateUrl: './inline-movie-list.component.html',
  styleUrls: ['./inline-movie-list.component.css']
})
export class InlineMovieListComponent implements OnInit {
  private movies : ICompressedMovie[];
  moviesSlide1 : ICompressedMovie[];
  moviesSlide2 : ICompressedMovie[];
  titles : string[] = ["Movie 1", "Movie 2", "Movie 3", "Movie 1", "Movie 2", "Movie 3", "Movie 1", "moviw 10", "inca unul si gata"];

  @Input()
  componentId : string;

  constructor(private movieService : MovieRestService) {
  }

  getMoviesFromIndexTo(start : number, end : number, movies : ICompressedMovie[]) : ICompressedMovie[]{
    let i : number = start;
    let moviesSlice : ICompressedMovie[] = [];

    while(i < end) {
      moviesSlice.push(movies[i]);
      i++;
    }

    return moviesSlice;
  }

  getId() : string {
    return "carousel" + this.componentId;
  }

  getReference(id : string) : string {
    return "#carousel" + id;
  }

  ngOnInit(): void {
    this.movieService.getCompressedMovies(0, "topRated")
      .subscribe(movies => {this.movies = movies; 
                            this.moviesSlide1 = this.getMoviesFromIndexTo(0, 9, movies);
                            this.moviesSlide2 = this.getMoviesFromIndexTo(9, 18, movies); });
  }

}
