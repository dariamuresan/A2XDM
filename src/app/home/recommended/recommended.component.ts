import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { MovieRestService } from 'src/app/shared/movie-rest.service';
import { ICompressedMovie } from 'src/app/shared/movie.model';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  movies : ICompressedMovie[];
  moviesSlide1 : ICompressedMovie[];
  moviesSlide2 : ICompressedMovie[];

  username: string;

  constructor(private movieService : MovieRestService,
    private authService: AuthenticationService) {
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

  ngOnInit(): void {
    this.username = this.authService.getCurrentLoggedUser();

    this.movieService.getRecommended(this.username)
      .subscribe(movies => {this.movies = movies; 
                            this.moviesSlide1 = this.getMoviesFromIndexTo(0, 9, movies);
                            this.moviesSlide2 = this.getMoviesFromIndexTo(9, 18, movies); });
  }
}
