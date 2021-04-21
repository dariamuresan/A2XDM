import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IReview } from './review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input()
  reviews: IReview[];

  @ViewChild('f') signupForm: NgForm;
  newReview: IReview = {id : null,
    stars : null,
    date : null,
    comment : "", 
    username : "",
    replies : [] };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("soon");
  }

}
