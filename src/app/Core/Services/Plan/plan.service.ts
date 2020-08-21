import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PlanDetalle } from 'src/app/Models/PlanDetalle';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  obtenerDetallePlan(idPlan: number): Observable<PlanDetalle> {
    return this.http.get<PlanDetalle>(environment.UrlBaseApi + `Plan/${idPlan}?activo=true`, this.httpOptions);
  }

  obtenerPlanesEmpresa(idEmpresa: number, idEstado: number = 1): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/Planes?activo=true&estadoPlan=${idEstado}`, this.httpOptions);
  }

  obtenerTiposPlan(): Observable<any> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Plan/Tipos`, this.httpOptions);  
  }

  obtenerEstadosPosiblesPlan(): Observable<any> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Plan/Estados`, this.httpOptions);  
  }

  alta(plan:any) : Observable<any> {
    return this.http.post<any>(environment.UrlBaseApi + 'Plan', {Model: plan}, this.httpOptions); 
  }

  completarPlan(idPlan: number): Observable<any> {
    return this.http.put<any>(environment.UrlBaseApi + `Plan`, {Model: {id: idPlan, estadoId: 3 }}, this.httpOptions); 
  }

  cancelarPlan(idPlan: number): Observable<any> {
    return this.http.put<any>(environment.UrlBaseApi + `Plan`, {Model: {id: idPlan, estadoId: 4 }}, this.httpOptions); 
  }

  estanTodasLasVisitasCerradas(idPlan: number): Observable<any> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Plan/${idPlan}/VisitasCerradas`, this.httpOptions);  
  }
  
}
