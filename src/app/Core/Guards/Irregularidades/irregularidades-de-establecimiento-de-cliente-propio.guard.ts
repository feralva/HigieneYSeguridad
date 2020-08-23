import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth/auth.service';
import { EstablecimientoService } from '../../Services/Establecimiento/establecimiento.service';
import { ClienteService } from '../../Services/Cliente/cliente.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IrregularidadesDeEstablecimientoDeClientePropioGuard implements CanActivate {

  constructor(private authService: AuthService, private establecimientoService: EstablecimientoService,
    private clienteService: ClienteService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      const idEstablecimiento = +next.paramMap.get('idEstablecimiento');
        
      const usuario = await  this.authService.getUserSubject().pipe(first()).toPromise()
      const establecimiento = await  this.establecimientoService.obtenerEstablecimiento(idEstablecimiento).pipe(first()).toPromise()
      const cliente = await  this.clienteService.obtenerCliente(establecimiento.clienteId).pipe(first()).toPromise()
      
      return new Promise<boolean>((resolve, reject) => {
        resolve(usuario.empresaId === cliente.empresaId)
      }) 
  }
  
}
