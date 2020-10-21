import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-planes',
  templateUrl: './cliente-planes.component.html',
  styleUrls: ['./cliente-planes.component.scss'],
})
export class ClientePlanesComponent implements OnInit {

  planes: any[] = []
  currentUser: UserLogueado;
  estadoPlanAFiltrarId: number = 0;
  estadosPlanesPosibles: any[];
  idCliente:number;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private loaderService: LoaderService,
    private clienteService: ClienteService, private authService: AuthService,
    private planService:PlanService) { }

  ngOnInit() {

    this.planes = this.route.snapshot.data['planes'];
    this.estadosPlanesPosibles = this.route.snapshot.data['estadosPlanesPosibles'];
    this.appDataService.changePageName('Cliente.Planes');
    this.idCliente = +this.route.snapshot.paramMap.get('id')
  
    this.authService.getUserSubject().pipe(first()).subscribe(
      data => {
        this.currentUser = data
      },
      error => console.log(error)
    );

    console.log(this.planes)
  }

  doRefresh(event) {
    console.log('Begin async operation');

    var id = +this.route.snapshot.paramMap.get('id')

    this.clienteService.obtenerPlanesActivosCliente(id).subscribe(
      data => {
        console.log(data)
        this.planes = data;
        event.target.complete();
      },
      (error) => {
        console.log(error)
        event.target.complete()
      }
    );
  }

  actualizarPlanesPorEstado(event){
    console.log('Actualizo Planes')
    this.planes = [];

    this.loaderService.present(); 
    console.log(event)
    this.clienteService.obtenerPlanesActivosCliente(this.idCliente , this.estadoPlanAFiltrarId).subscribe(
      data => {
        console.log(data)
        this.planes = data;
        this.loaderService.dismiss();
      },
      (error) => console.log(error)
    )
  }

}
