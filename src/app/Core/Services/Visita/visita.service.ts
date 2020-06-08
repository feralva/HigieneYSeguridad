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
}
