import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, private db: AngularFirestore) { }


  obtenerControlesVisita(idVisita: number): Observable<any[]> {
    
    return this.db.collection<any>('controles',ref => ref.where('visitaId', '==', idVisita)).valueChanges().pipe(
      take(1)
    )    
  }
  obtenerMedicionesControl(idControl: string): Observable<any[]> {
    
    return this.db.collection<any>('mediciones',ref => ref.where('idControl', '==', idControl)).valueChanges().pipe(
      take(1)
    )    
  }

}
