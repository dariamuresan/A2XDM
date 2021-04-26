import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
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

  currentLoggedUser : string;

  newReply : IReply = {id : null,
    date : '',
    username : '',
    content : ''};

  constructor(private movieService : MovieRestService,
    private authenticationService : AuthenticationService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.currentLoggedUser = this.authenticationService.getCurrentLoggedUser();
  }

  onAddReply() {
    let date = new Date();
    this.newReply.date = this.datePipe.transform(date,"dd-MM-yyyy");
    this.newReply.username = this.currentLoggedUser;

    this.movieService.addReplyToRview(this.newReply, this.reviewId).subscribe(newReply => {
      this.replies.push(newReply);
    })

    this.newReply = {id : null,
      date : '',
      username : '',
      content : ''};
  }

  onDelete(reply : IReply) {
    if(confirm("Are you sure you want to delete this reply ?")) {
      this.movieService.deleteReply(reply).subscribe();

      this.replies = this.replies.filter(rep => {
        return rep.id != reply.id;
      });
    }
  }
}
