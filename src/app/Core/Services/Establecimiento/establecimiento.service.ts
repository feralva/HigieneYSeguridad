import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  alta(establecimiento:any) : Observable<any> {
    return this.http.post<any>(environment.UrlBaseApi + 'Establecimiento', {Model: establecimiento}, this.httpOptions); 
  }
}