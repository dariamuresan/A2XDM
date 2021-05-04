import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  sortMethodSubject: Subject<string> = new Subject<string>();

  constructor() { }

  setSortMethod(sortMethod : string) {
    this.sortMethodSubject.next(sortMethod);
  }
}
