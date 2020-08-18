import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PagoService } from './pago.service';

@Injectable({
  providedIn: 'root'
})
export class PagosResolverService implements Resolve<any[]>{

    constructor(private pagoService: PagoService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
  
        return this.pagoService.obtenerPagos(+route.paramMap.get('idControl'), undefined);
    }
}