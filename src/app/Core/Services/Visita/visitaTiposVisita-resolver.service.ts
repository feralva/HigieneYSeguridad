import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ClienteService } from '../Cliente/cliente.service';
import { VisitaService } from './visita.service';

@Injectable({
  providedIn: 'root'
})
export class VisitaTiposVisitaResolverService implements Resolve<any[]>{

    constructor(private visitaService: VisitaService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

        return this.visitaService.obtenerTiposVisita();
    }

}