import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { first } from 'rxjs/operators';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaDatosGraficoVisitasPorEstadoResolver implements Resolve<any[]>{

    constructor(private empresaService: EmpresaService, private authService: AuthService){}

    idEmpresa: number;
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

        this.authService.getUserSubject().pipe(first()).subscribe(
          data => this.idEmpresa = data.empresaId,
          error => console.log(error)
        );
        return this.empresaService.obtenerInformacionVisitasPorEstado(this.idEmpresa);
    }

}