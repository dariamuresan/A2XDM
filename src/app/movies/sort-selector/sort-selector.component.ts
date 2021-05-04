import { Component, OnInit } from '@angular/core';
import { SortService } from 'src/app/shared/sort.service';

@Component({
  selector: 'app-sort-selector',
  templateUrl: './sort-selector.component.html',
  styleUrls: ['./sort-selector.component.css']
})
export class SortSelectorComponent implements OnInit {
  method : string = 'topRated';

  constructor(private sortService: SortService) { }

  ngOnInit(): void {
  }

  onChange() {
    this.sortService.setSortMethod(this.method);
  }

}
