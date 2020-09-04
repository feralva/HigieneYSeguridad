import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth/auth.service';
import { ClienteService } from '../../Services/Cliente/cliente.service';
import { VisitaService } from '../../Services/Visita/visita.service';
import { first } from 'rxjs/operators';
import { EstablecimientoService } from '../../Services/Establecimiento/establecimiento.service';

@Injectable({
  providedIn: 'root'
})
export class VisitaDeClientePropioGuard implements CanActivate {
 
  constructor(private authService: AuthService, private clienteService: ClienteService,
    private visitaService: VisitaService,private establecimientoService: EstablecimientoService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

/*       return true; */
    const idVisita = +next.paramMap.get('id');

    const usuario = await  this.authService.getUserSubject().pipe(first()).toPromise()
    const visita = await  this.visitaService.obtenerVisitaDetalle(idVisita).pipe(first()).toPromise()
    const establecimiento = await  this.establecimientoService.obtenerEstablecimiento(visita.establecimientoId).pipe(first()).toPromise()
    const cliente = await  this.clienteService.obtenerCliente(establecimiento.clienteId).pipe(first()).toPromise()

    return new Promise<boolean>((resolve, reject) => {
      resolve(usuario.empresaId === cliente.empresaId)
    })
  }
  
}
