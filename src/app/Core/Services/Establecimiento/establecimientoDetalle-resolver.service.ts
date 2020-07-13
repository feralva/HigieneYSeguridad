import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ClienteService } from '../Cliente/cliente.service';
import { EstablecimientoService } from './establecimiento.service';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoDetalleResolverService implements Resolve<any[]>{

    constructor(private establecimientoService: EstablecimientoService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{
        const idEstablecimiento = +route.paramMap.get('id');

        return this.establecimientoService.obtenerEstablecimiento(idEstablecimiento);
    }

}