import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieRestService } from 'src/app/shared/movie-rest.service';
import { IReview } from './review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input()
  reviews: IReview[];
  @Input()
  movieId: string;

  @ViewChild('f') signupForm: NgForm;
  newReview: IReview = {id : null,
    stars : null,
    date : "",
    comment : "", 
    username : "",
    replies : [] 
  };

  constructor(private movieService : MovieRestService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("soon");

    let date = new Date();
    this.newReview.date = this.datePipe.transform(date,"dd-MM-yyyy");

    console.log(this.newReview.date);


    this.movieService.addReview(this.newReview, this.movieId).subscribe(newReview => {
      this.reviews.push(newReview);
    })

    this.newReview = {id : null,
      stars : null,
      date : null,
      comment : "", 
      username : "",
      replies : [] 
    };
  }

}
