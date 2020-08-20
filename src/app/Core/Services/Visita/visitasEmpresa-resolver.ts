import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { VisitaService } from './visita.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitaEmpresaResolverService implements Resolve<any[]>{

    constructor(private authService:AuthService, private visitaService: VisitaService){}
  
    idEmpresa: number;
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
  
      this.authService.getUserSubject().pipe(first()).subscribe(
        data => this.idEmpresa = data.empresaId,
        error => console.log(error)
      );
        return this.visitaService.obtenerVisitasEmpresa(this.idEmpresa);
    }
}