import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { IUser } from '../user-profile/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user : IUser = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    profilePicture: "",
    isNotified : false
  };

  active : boolean = false;

  whatWeSearchFor : string = "";

  constructor(private router : Router,
    private authService: AuthenticationService) {}

  onInput() {
    this.router.navigate(['search-result', this.whatWeSearchFor]);
  }

  onProfile() {
    this.router.navigate(['profile', this.user.username]);
  }

  isActive() : boolean {
    return this.active;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.authService.userSubject.subscribe(
      currentSession => {
        if(currentSession == null)
          this.active = false;
        else {
          this.authService.getUserByUsername(currentSession.username).subscribe( response => {
            this.user.username = response.username;
            this.user.firstName = response.firstname;
            this.user.lastName = response.lastname;
            this.user.email = response.email;
            this.user.profilePicture = response.image;
            this.user.role = response.role;
            this.user.isNotified = response.newsletter;
          });
          this.active = true;
        }
      }
    )
  }

}
