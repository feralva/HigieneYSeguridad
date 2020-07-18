import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }


  obtenerVisitasEmpresa(idEmpresa: number): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/Visitas?activo=true`, this.httpOptions);
  }
  obtenerVisitasPendientesEmpleado(idEmpleado: number): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Visita/Empleado/${idEmpleado}?activo=true&estado=1`, this.httpOptions);
  }

  obtenerTiposVisita(): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Visita/Tipos`, this.httpOptions);
  }

  alta(visita:any) : Observable<any> {
    return this.http.post<any>(environment.UrlBaseApi + 'Visita', {Model: visita}, this.httpOptions); 
  }

  obtenerVisitaDetalle(idVisita: number): Observable<any> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Visita/${idVisita}`, this.httpOptions);
  }

  actualizarAuditorVisita(idVisita: number, idAuditor: number):Observable<any> {
    return this.http.put<any>(environment.UrlBaseApi + `Visita/reasignar`, {Model: {Id: idVisita, EmpleadoId: idAuditor}}, this.httpOptions);
  }
  
  actualizarFechaVisita(idVisita: number, fecha: Date, duracion: number):Observable<any> {
    console.log(fecha)
    console.log(duracion)
    return this.http.put<any>(environment.UrlBaseApi + `Visita/cambiarFecha`, {Model: {Id: idVisita, Fecha: fecha, Duracion: duracion}}, this.httpOptions);
  }
}
