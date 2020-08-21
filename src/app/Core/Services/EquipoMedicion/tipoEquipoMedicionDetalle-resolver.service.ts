import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ClienteService } from '../Cliente/cliente.service';
import { EquipoMedicionService } from './equipo-medicion.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipoMedicionDetalleResolver implements Resolve<any[]>{

    idEmpresa:number;
    constructor(private equipoMedicionService: EquipoMedicionService, private authService: AuthService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

      this.authService.getUserSubject().pipe(first()).subscribe(
        data => this.idEmpresa = data.empresaId,
        error => console.log(error)
      );

      const nombre = route.paramMap.get('nombre');

      return this.equipoMedicionService.ObtenerTipoEquipoMedicion(nombre, this.idEmpresa);
    }

}