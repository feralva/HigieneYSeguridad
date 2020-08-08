import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ControlService } from './control.service';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ControlesVisitaResolverService implements Resolve<any[]>{

    constructor(private controlService: ControlService, public loadingCtrl: LoadingController){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
  
      return this.controlService.obtenerControlesVisita(+route.paramMap.get('id'));
    }
}