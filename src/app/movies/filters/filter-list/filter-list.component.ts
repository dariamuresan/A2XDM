import { Component, Input, OnInit } from '@angular/core';
import { IFilterItem } from 'src/app/shared/filter-item.model';
import { FilterService } from 'src/app/shared/filter.service';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Input()
  filters : string[];

  title : string;
  items : IFilterItem[] = [];

  constructor(private filterService : FilterService) { }

  ngOnInit(): void {
    this.title = this.filters[0];
    this.filters = this.filters.slice(1);

    for(let i = 0; i < this.filters.length; i++) {
      this.items.push({name : this.filters[i], isSelected : false});
    }

    this.filterService.setFilterArray(this.title, this.items);
  }

  onChange() {
    this.filterService.setFilterArray(this.title, this.items);
  }

}
