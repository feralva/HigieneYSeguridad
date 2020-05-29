import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Empresa } from '../../../Models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  rutasServicios = {
    Alta : 'https://localhost:44380/api/Empresa'
  };

  constructor(private http: HttpClient) { }

  addEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.rutasServicios.Alta, {Model: empresa}, this.httpOptions);
  }

}
