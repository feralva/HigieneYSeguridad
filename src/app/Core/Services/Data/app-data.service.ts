import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  private pageNameSource = new BehaviorSubject('');
  currentPageName = this.pageNameSource.asObservable();

  constructor() { }

  changePageName(pageName: string) {
    this.pageNameSource.next(pageName);
  }

}
