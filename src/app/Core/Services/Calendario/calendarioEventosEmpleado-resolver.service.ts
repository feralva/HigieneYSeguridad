import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { VisitaService } from '../Visita/visita.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CalendarioEventosEmpleado implements Resolve<any[]>{

    constructor(private visitaService: VisitaService, private authService: AuthService){}

    idEmpleado: number;
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>{

        
        this.authService.getUserSubject().subscribe(
          data => this.idEmpleado = data.empleadoId,
          error => console.log(error)
        );

        return this.visitaService.obtenerVisitasPendientesEmpleado(this.idEmpleado).pipe(
                    map(visitas => visitas.map(visita =>({
                        title: visita.nombreCliente + ' - ' + visita.nombreEstablecimiento + ' - ' + visita.tipoVisita,
                        allday: false,
                        startTime: new Date(visita.fecha),
                        endTime: new Date(new Date(visita.fecha).getTime() + (visita.duracion)*60000)
                        })) 
                    )
        );
    }

}