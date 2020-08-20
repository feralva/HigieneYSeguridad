import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }


  logError(message: string, stack: string) {
    console.log(message)
  }
}
