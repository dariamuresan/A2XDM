import { DatePipe, ViewportScroller } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { MovieRestService } from 'src/app/shared/movie-rest.service';
import { IReview } from './review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input()
  reviews : IReview[] = [];
  @Input()
  movieId: string;

  currentLoggedUser : string;
  userAddedReview : boolean = false;

  @ViewChild('addForm') addReviewForm: NgForm;
  newReview: IReview = {
    id : null,
    stars : null,
    date : "",
    comment : "", 
    username : "",
    replies : [] 
  };

  @ViewChild('editForm') editReviewForm: NgForm;
  userReview: IReview = {
    id : null,
    stars : null,
    date : "",
    comment : "", 
    username : "",
    replies : [] 
  };

  constructor(private movieService : MovieRestService,
    private authenticationService : AuthenticationService,
    private viewportScroller: ViewportScroller,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.currentLoggedUser = this.authenticationService.getCurrentLoggedUser();

    this.checkUserHasAddedAReview();
  }

  private checkUserHasAddedAReview() {
    for(let review of this.reviews) {
      if(review.username == this.currentLoggedUser) {
        this.userAddedReview = true;
        this.userReview = review;
      }
    }
  }

  onDelete(review : IReview) {
    if(confirm('Are you sure you want to delete this review ?')) {
      this.movieService.deleteReview(review).subscribe();

      this.reviews = this.reviews.filter(r => {return r.id != review.id });

      this.userAddedReview = false;
    }
  }

  onClick(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
  }

  onAddReview() {
    this.newReview.date = this.getDate();

    this.newReview.username = this.currentLoggedUser;

    this.movieService.addReview(this.newReview, this.movieId).subscribe(newReview => {
      this.reviews.push(newReview);
    })

    this.userAddedReview = true;
    this.userReview = this.newReview;

    this.newReview = {
      id : null,
      stars : null,
      date : null,
      comment : "", 
      username : "",
      replies : [] 
    };
  }

  onEditReview() {
    this.userReview.date = this.getDate();

    this.movieService.editReview(this.userReview).subscribe(() => { 
      alert('Review edited !') });
  }

  private getDate() : string {
    let date = new Date();
    return this.datePipe.transform(date,"dd-MM-yyyy");
  }

}
