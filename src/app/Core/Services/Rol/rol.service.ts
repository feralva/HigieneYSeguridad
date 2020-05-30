import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Familia } from 'src/app/Models/Familia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  rutasServicios = {
    Alta : '',
    ObtenerRolesDisponibles: 'https://localhost:44380/apiHigSeg/Authenticate/roles'
  };

  constructor(private http: HttpClient) { }

  obtenerRolesDisponibles(): Observable<Familia[]> {
    return this.http.get<Familia[]>(this.rutasServicios.ObtenerRolesDisponibles, this.httpOptions);
  }

  obtenerRolesUsuario(idUsuario:string): Observable<Familia[]> {

    return this.http.get<Familia[]>(`https://localhost:44380/apiHigSeg/Authenticate/user/${idUsuario}/roles`, this.httpOptions);
  }

}
