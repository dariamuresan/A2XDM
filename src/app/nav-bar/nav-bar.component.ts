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

  user : IUser;
  active : boolean;

  whatWeSearchFor : string = "";

  constructor(private router : Router,
    private authService: AuthenticationService) {}

  onInput() {
    this.router.navigate(['search-result', this.whatWeSearchFor]);
  }

  onProfile() {
    this.router.navigate(['profile']);
  }

  isActive() : boolean {
    return this.active;
  }

  onLogout() {
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
        else
          this.user = this.authService.getUserByUsername(currentSession.username);
          this.active = true;
      }
    )
  }

}
