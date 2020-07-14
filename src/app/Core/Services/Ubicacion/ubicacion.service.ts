import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  obtenerUbicacion(idUbicacion: number): Observable<any> {
    return this.http.get<any[]>(environment.UrlBaseApi + `Ubicacion/${idUbicacion}`, this.httpOptions);
  }
}
