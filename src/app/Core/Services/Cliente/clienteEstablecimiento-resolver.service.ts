import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteEstablecimientosResolver implements Resolve<any[]>{

    constructor(private clienteService: ClienteService){}

    idEmpresa: number;
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        const idCliente = +route.paramMap.get('id');

        return this.clienteService.obtenerEstablecimientosActivosCliente(idCliente);
    }
}