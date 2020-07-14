import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MedicionService } from './medicion.service';

@Injectable({
  providedIn: 'root'
})
export class MedicionesControlResolverService implements Resolve<any[]>{

    constructor(private medicionService: MedicionService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
  
        return this.medicionService.obtenerMedicionesControl(route.paramMap.get('idControl'));
    }
}