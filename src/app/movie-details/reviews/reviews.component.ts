import { Component, Input, OnInit } from '@angular/core';
import { IReview } from './review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input()
  reviews: IReview[];

  newReview: IReview;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("soon");
  }

}
