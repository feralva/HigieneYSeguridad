import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IrregularidadService } from './irregularidad.service';

@Injectable({
  providedIn: 'root'
})
export class IrregularidadesTiposResolver implements Resolve<any[]>{

  constructor(private irregularidadService: IrregularidadService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

      return this.irregularidadService.obtenerTiposIrregularidades();
  }

}