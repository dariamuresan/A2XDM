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

  user: IUser = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    profilePicture: "",
    isNotified : false
  };
  username: string;

  constructor(private authService: AuthenticationService, 
    private router : Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];

    this.authService.getUserByUsername(this.username).subscribe( response => {
      this.user.username = response.username;
      this.user.firstName = response.firstname;
      this.user.lastName = response.lastname;
      this.user.email = response.email;
      this.user.profilePicture = response.image;
      this.user.role = response.role;
      this.user.isNotified = response.newsletter;
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

}
