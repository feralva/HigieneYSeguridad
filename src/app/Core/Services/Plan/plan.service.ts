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
  rutasServicios = {
    Alta : ''
  };

  constructor(private http: HttpClient) { }

  obtenerDetallePlan(idPlan: number): Observable<PlanDetalle> {
    return this.http.get<PlanDetalle>(environment.UrlBaseApi + `Plan/${idPlan}`, this.httpOptions);
 
  }
}
