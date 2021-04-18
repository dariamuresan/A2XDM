import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IFilterItem } from './filter-item.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  genresFilter : IFilterItem[];
  ratingFilter : IFilterItem[];

  genresSubject:Subject<string[]> = new Subject<string[]>();
  ratingSubject:Subject<string> = new Subject<string>();

  constructor() { }

  setFilterArray(array : string, values : IFilterItem[]) {
    let activeFilters : string[] = [];

    if(array == "Genres") {
      this.genresFilter = values;
      activeFilters = this.getActiveFilters(this.genresFilter);
      this.genresSubject.next(activeFilters);
    }
    else
      if(array == "Min. Rating") {
        this.ratingFilter = values;
        activeFilters = this.getActiveFilters(this.ratingFilter);
        if(activeFilters.length == 0)
          this.ratingSubject.next("");
        else
          this.ratingSubject.next(activeFilters[0]);
      }
  }

  getActiveFilters(filterArray) : string[] {
    let activeFilters : string[] = [];

    for(let f of filterArray) {
      if(f.isSelected)
        activeFilters.push(f.name);
    }

    return activeFilters;
  }
}
