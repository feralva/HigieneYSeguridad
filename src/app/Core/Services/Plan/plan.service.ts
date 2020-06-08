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
    return this.http.get<PlanDetalle>(environment.UrlBaseApi + `Plan/${idPlan}`, this.httpOptions);
  }

  obtenerPlanesEmpresa(idEmpresa: number): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Empresa/${idEmpresa}/Planes?activo=true`, this.httpOptions);
  }

  obtenerTiposPlan(): Observable<any> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Plan/Tipos`, this.httpOptions);
 
    
  }
}
