import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { VisitaService } from './visita.service';

@Injectable({
  providedIn: 'root'
})
export class VisitaPendienteResolverService implements Resolve<any[]>{

    constructor(private authService:AuthService, private visitaService: VisitaService){}
  
    idEmpleado: number;
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
  
      this.authService.getUserSubject().subscribe(
        data => this.idEmpleado = data.empleadoId,
        error => console.log(error)
      );
        return this.visitaService.obtenerVisitasPendientesEmpleado(this.idEmpleado);
    }
}