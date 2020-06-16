import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  private pageNameSource = new BehaviorSubject('');
  //private pagePreviousNameSource = new BehaviorSubject('');
  currentPageName = this.pageNameSource.asObservable();
  //previousPage = this.pagePreviousNameSource.asObservable();

  constructor() { }

  changePageName(pageName: string) {
    //this.pagePreviousNameSource.getValue();
    this.pageNameSource.next(pageName);
  }

/*   setPageToPrevious(){

    this.pageNameSource.next(this.pagePreviousNameSource.getValue());
  } */

}
