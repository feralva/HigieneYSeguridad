import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { take, mergeMap, map, tap } from 'rxjs/operators';
import { Control } from 'src/app/Models/Control';
import { Medicion } from 'src/app/Models/Medicion';
import { LoaderService } from '../loader.service';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, private db: AngularFirestore) { }

  obtenerControlesVisita(idVisita: number): Observable<any[]> {

    return this.db.collection<any>('controles',ref => ref.where('visitaId', '==', idVisita)).valueChanges({ idField: 'id' })
    .pipe(
      take(1)/* ,
      tap(() => ref.loadingCtrl.dismiss()) */
    )    
  }

  async altaControlVisita(control: Control, mediciones: any[]){

    var idControl;
    await this.db.collection('controles').add(control)
      .then(function(docRef) {

        idControl = docRef.id
    });

    mediciones.forEach(async medicion => {

      medicion.idControl = idControl;
      console.log(medicion)
      await this.db.collection('mediciones').add(medicion).then(function(docRef) {

        idControl = docRef.id
      });

    });
/*     Object.keys(mediciones).forEach(async propiedad => {

      var medicion = {
        ["idControl"]: idControl,
        [propiedad]: mediciones[propiedad]
      }

      await this.db.collection('mediciones').add(medicion).then(function(docRef) {

        idControl = docRef.id
      });

    }) */
  }

}
