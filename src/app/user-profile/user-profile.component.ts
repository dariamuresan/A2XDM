import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { IUser } from './user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: IUser;
  username: string;

  constructor(private authService: AuthenticationService, 
    private router : Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];

    this.user = this.authService.getUserByUsername(this.username);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

}
