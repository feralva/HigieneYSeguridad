import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  planes: any[] = []
  nombrePagina: string;
  currentUser: UserLogueado;
  estadoPlanAFiltrarId: number = 1;
  estadosPlanesPosibles: any[];
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private planService: PlanService, 
    private authService: AuthService, public loaderService: LoaderService) { }

  ngOnInit() {

    this.planes = this.route.snapshot.data['planes'];
    this.estadosPlanesPosibles = this.route.snapshot.data['estadosPlanesPosibles'];

    this.authService.getUserSubject().subscribe(
      data => {
        this.currentUser = data
      },
      error => console.log(error)
    );

    console.log(this.planes)
    console.log(this.estadosPlanesPosibles)
  }

  ionViewWillEnter(){
    this.nombrePagina = 'Empresa.Planes';
    this.appDataService.changePageName(this.nombrePagina);
  }

  actualizarPlanesPorEstado(event){
    console.log('Actualizo Planes')
    this.planes = [];

    this.loaderService.present(); 
    console.log(event)
    this.planService.obtenerPlanesEmpresa(this.currentUser.empresaId , event).subscribe(
      data => {
        this.planes = data;
        this.loaderService.dismiss();
      },
      (error) => console.log(error)
    )
  }

  doRefresh(event) {

    var id = +this.route.snapshot.paramMap.get('id')

    this.planService.obtenerPlanesEmpresa(id).subscribe(
      data => this.planes = data,
      (error) => console.log(error)
    );

    event.target.complete();
  }

}

