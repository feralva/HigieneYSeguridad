import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, mergeMap, map, tap } from 'rxjs/operators';
import { Control } from 'src/app/Models/Control';
import { Medicion } from 'src/app/Models/Medicion';
import { LoaderService } from '../loader.service';
import { LoadingController } from '@ionic/angular';
import { NetworkService, ConnectionStatus } from '../network-service.service';
import { OfflineManagerService } from '../offline-manager-service.service';
import { Storage } from "@ionic/storage"

const API_STORAGE_KEY = 'safetify';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private db: AngularFirestore,
    private networkService: NetworkService, private offlineManager: OfflineManagerService,
    public storage: Storage) { }

  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }

/*   obtenerControlesVisita(idVisita: number): Observable<any> {

    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.getLocalData(`Control/Visita/${idVisita}`));
    } else {
      return this.db.collection<any[]>('controles',ref => ref.where('visitaId', '==', idVisita)).valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        tap(res => {
          console.log(res)
          this.setLocalData(`Control/Visita/${idVisita}`, res);
        })
      )   
    }
  } */
  obtenerControlesVisita(idVisita: number): Observable<any> {
/* 
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.getLocalData(`Control/Visita/${idVisita}`));
    } else { */
      return this.db.collection<any[]>('controles', ref => ref.where('visitaId', '==', idVisita)).valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        tap(res => {
          console.log(res)
          this.setLocalData(`Control/Visita/${idVisita}`, res);
        })/* ,
        tap(() => ref.loadingCtrl.dismiss()) */
      )   
   /*  } */
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
  }

  bajaControl(idcontrol: string) {

    return this.db.collection('controles').doc(idcontrol).delete()
  }

}
