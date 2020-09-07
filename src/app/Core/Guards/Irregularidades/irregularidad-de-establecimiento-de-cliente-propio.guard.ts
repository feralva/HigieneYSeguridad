import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth/auth.service';
import { EstablecimientoService } from '../../Services/Establecimiento/establecimiento.service';
import { ClienteService } from '../../Services/Cliente/cliente.service';
import { first } from 'rxjs/operators';
import { IrregularidadService } from '../../Services/Irregularidad/irregularidad.service';
import { UbicacionService } from '../../Services/Ubicacion/ubicacion.service';

@Injectable({
  providedIn: 'root'
})
export class IrregularidadDeEstablecimientoDeClientePropioGuard implements CanActivate {

  constructor(private authService: AuthService, private establecimientoService: EstablecimientoService,
    private clienteService: ClienteService, private irregularidadService: IrregularidadService,
    private ubicacionService: UbicacionService){}

    async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean> {
  
        const idIrregularidad = +next.paramMap.get('idIrregularidad');

        const irregularidad = await this.irregularidadService.obtenerIrregularidad(idIrregularidad).pipe(first()).toPromise()
        const ubicacion = await this.ubicacionService.obtenerUbicacion(irregularidad.ubicacionId).pipe(first()).toPromise()

        const usuario = await  this.authService.getUserSubject().pipe(first()).toPromise()
        const establecimiento = await  this.establecimientoService.obtenerEstablecimiento(ubicacion.establecimientoId).pipe(first()).toPromise()
        const cliente = await  this.clienteService.obtenerCliente(establecimiento.clienteId).pipe(first()).toPromise()
        
        return new Promise<boolean>((resolve, reject) => {
          resolve(usuario.empresaId === cliente.empresaId)
        }) 
    }
  
}
