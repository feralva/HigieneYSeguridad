import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ClienteService } from '../Cliente/cliente.service';
import { IrregularidadService } from './irregularidad.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IrregularidadesEmpresaResolver implements Resolve<any[]>{

  idEmpresa: number;

  constructor(private irregularidadService: IrregularidadService, private authService: AuthService){}
  

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

    this.authService.getUserSubject().pipe(first()).subscribe(
      data => {
        this.idEmpresa = data.empresaId
      },
      error => console.log(error)
    );
      return this.irregularidadService.ObtenerIrregularidades(this.idEmpresa, undefined, undefined);
  }

}