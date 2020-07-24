import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { VisitaService } from './visita.service';

@Injectable({
  providedIn: 'root'
})
export class VisitaEstadoResolverService implements Resolve<any>{

    constructor(private authService:AuthService, private visitaService: VisitaService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{

        return this.visitaService.obtenerEstadosPosiblesVisita();
    }
}