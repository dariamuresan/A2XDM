import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input()
  set starsNumber(n : number) {
    this._starsNumber = n;
    this.generateStarsArray();
  }

  private _starsNumber : number;
  stars : number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateStarsArray();
  }

  generateStarsArray() {
    this.stars = [];

    for(let i = 0; i < this._starsNumber; i++)
      this.stars.push(1);
  }

}
