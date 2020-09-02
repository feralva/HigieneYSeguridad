import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private db: AngularFirestore) { }

  obtenerMedicionesControl(idControl: string): Observable<any[]> {
    
    return this.db.collection<any>('mediciones',
         ref => ref.where('idControl', '==', idControl)).valueChanges({ idField: 'id' })
    .pipe(
     take(1)
   ) 
 }
}
