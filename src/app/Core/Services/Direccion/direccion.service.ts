import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class DireccionService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  obtenerPartidosProvincia(idProvincia: number): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi +`Direccion/provincia/${idProvincia}/Partidos`, this.httpOptions);
  }

  obtenerProvincias(): Observable<any[]> {
    return this.http.get<any[]>(environment.UrlBaseApi +`Direccion/provincias`, this.httpOptions);
  }
}
