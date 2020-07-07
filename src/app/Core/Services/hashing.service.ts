import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class HashingService {

 constructor() { }

  hashearString(cadenaString: string): string{

    var hash = CryptoJS.SHA256(cadenaString).toString(CryptoJS.enc.Hex);

    return hash;
  }
 
}
