import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private user : number;

  constructor() { 
    this.user = 1;
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
