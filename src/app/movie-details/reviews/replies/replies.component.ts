import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MovieRestService } from 'src/app/shared/movie-rest.service';
import { IReply } from '../review.model';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit {

  @Input()
  replies : IReply[];
  @Input()
  reviewId : number;

  newReply : IReply = {id : null,
    date : '',
    username : '',
    content : ''};

  constructor(private movieService : MovieRestService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  onAddReply() {
    let date = new Date();
    this.newReply.date = this.datePipe.transform(date,"dd-MM-yyyy");

    this.movieService.addReplyToRview(this.newReply, this.reviewId).subscribe(newReply => {
      this.replies.push(newReply);
    })

    this.newReply = {id : null,
      date : '',
      username : '',
      content : ''};
  }
}
