import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from "@ionic/storage"
import { NetworkService, ConnectionStatus } from '../network-service.service';
import { OfflineManagerService } from '../offline-manager-service.service';
import { tap } from 'rxjs/operators';

const API_STORAGE_KEY = 'safetify';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private networkService: NetworkService, private offlineManager: OfflineManagerService,
    public storage: Storage) { }

  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
 
  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }

  obtenerUbicacion(idUbicacion: number): Observable<any> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.getLocalData(`Ubicacion/${idUbicacion}`));
    } else {
      return this.http.get<any[]>(environment.UrlBaseApi + `Ubicacion/${idUbicacion}`, this.httpOptions).pipe(
        tap(res => {
          this.setLocalData(`Ubicacion/${idUbicacion}`, res);
        })
      )
    }
  }
  
  obtenerUbicacionesEstablecimiento(idEstablecimiento: number): Observable<any> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      console.log('Obtengo Ubicaciones desde local')
      return from(this.getLocalData(`Establecimiento/${idEstablecimiento}/Ubicaciones`));
    } else {
      console.log('Obtengo Ubicaciones desde red')
      return this.http.get<any[]>(environment.UrlBaseApi + `Establecimiento/${idEstablecimiento}/Ubicaciones`, this.httpOptions).pipe(
        tap(res => {
          this.setLocalData(`Establecimiento/${idEstablecimiento}/Ubicaciones`, res);
        })
      )
    }
  }
  
  BorrarUbicacion(idUbicacion: number): Observable<any> {
    
    return this.http.delete<any[]>(environment.UrlBaseApi + `Ubicacion/${idUbicacion}`, this.httpOptions)
  }
}
