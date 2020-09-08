import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NetworkService, ConnectionStatus } from '../network-service.service';
import { map, tap, filter, flatMap } from 'rxjs/operators';
import { OfflineManagerService } from '../offline-manager-service.service';
import { Storage } from "@ionic/storage"
import { UbicacionService } from '../Ubicacion/ubicacion.service';

const API_STORAGE_KEY = 'safetify';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private networkService: NetworkService, private offlineManager: OfflineManagerService,
    public storage: Storage, private ubicacionService: UbicacionService) { }

  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
 
  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }

  obtenerVisitasEmpresa(idEmpresa: number, idCliente: number = 0, idEstadoVisita: number = 0): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/Visitas?activo=true&clienteId=${idCliente}&estadoVisitaId=${idEstadoVisita}`, this.httpOptions);
  }

  obtenerVisitasPendientesEmpleado(idEmpleado: number): Observable<any> {

    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.getLocalData('misVisitas'));
    } else {
      return this.http.get(environment.UrlBaseApi + `Visita/Empleado/${idEmpleado}?activo=true&estado=1`, this.httpOptions).pipe(
        tap(res => {
          this.setLocalData('misVisitas', res);
        })
      )
    }
  }

  obtenerVisitasPendientesEmpresa(idEmpresa: number): Observable<any> {

    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.getLocalData(`Empresa/${idEmpresa}/Visitas`));
    } else {
      return this.http.get(environment.UrlBaseApi + `Empresa/${idEmpresa}/Visitas?activo=true&estadoVisitaId=1`, this.httpOptions).pipe(
        tap(res => {
          this.setLocalData(`Empresa/${idEmpresa}/Visitas`, res);
        })
      )
    }
  }

  obtenerTiposVisita(): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Visita/Tipos`, this.httpOptions);
  }

  obtenerEstadosPosiblesVisita(): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Visita/Estados`, this.httpOptions);
  }

  alta(visita:any) : Observable<any> {
    return this.http.post<any>(environment.UrlBaseApi + 'Visita', {Model: visita}, this.httpOptions); 
  }

  obtenerVisitaDetalle(idVisita: number): Observable<any> {

    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.getLocalData(`Visita/${idVisita}`));
    } else {
      return this.http.get<any[]>(environment.UrlBaseApi + `Visita/${idVisita}`, this.httpOptions).pipe(
        tap(res => {
          this.setLocalData(`Visita/${idVisita}`, res);
        })
      )
    }
 }

  actualizarAuditorVisita(idVisita: number, idAuditor: number):Observable<any> {
    return this.http.put<any>(environment.UrlBaseApi + `Visita/reasignar`, {Model: {Id: idVisita, EmpleadoId: idAuditor}}, this.httpOptions);
  }
  
  actualizarFechaVisita(idVisita: number, fecha: Date, duracion: number, idAuditor: number):Observable<any> {
    return this.http.put<any>(environment.UrlBaseApi + `Visita/cambiarFecha`, {Model: {Id: idVisita, Fecha: fecha, Duracion: duracion, EmpleadoId: idAuditor}}, this.httpOptions);
  }

  completarVisita(idVisita: number):Observable<any> {
    return this.http.put<any>(environment.UrlBaseApi + `Visita/completarVisita`, {Model: {Id: idVisita}}, this.httpOptions);
  }

  cancelarVisita(idVisita: any):Observable<any> {
    return this.http.put<any>(environment.UrlBaseApi + `Visita/cancelarVisita`, {Model: {Id: idVisita}}, this.httpOptions);
  }

}
