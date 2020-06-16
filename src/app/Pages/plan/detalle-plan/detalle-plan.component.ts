import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';
import { PlanDetalle } from 'src/app/Models/PlanDetalle';

@Component({
  selector: 'app-detalle-plan',
  templateUrl: './detalle-plan.component.html',
  styleUrls: ['./detalle-plan.component.scss'],
})
export class DetallePlanComponent implements OnInit {

  plan: PlanDetalle;
  nombrePagina: string;
  currentUser: UserLogueado;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,
    private planService: PlanService, private authService: AuthService) { }

  ngOnInit() {

    this.plan = this.route.snapshot.data['plan'];
  
    console.log(this.plan)
  }

  ionViewWillEnter(){
    this.nombrePagina = 'Plan.title';
    this.appDataService.changePageName(this.nombrePagina);
  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    var id = +this.route.snapshot.paramMap.get('id')

    this.planService.obtenerDetallePlan(id).subscribe(
      data => this.plan = data,
      (error) => console.log(error)
    );
  }
}
