import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private user : number;

  whatWeSearchFor : string = "";

  constructor(private router : Router) { 
    this.user = 1;
  }

  onInput() {
    console.log(this.whatWeSearchFor);

    this.router.navigate(['search-result', this.whatWeSearchFor]);
  }

  isActive() : number {
    return this.user;
  }

  onLogout() {
    this.user = 0;
  }

  onLogin() {
    this.user = 1;
  }

  ngOnInit(): void {
  }

}
