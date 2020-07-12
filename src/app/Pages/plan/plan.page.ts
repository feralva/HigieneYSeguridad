import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { PlanService } from 'src/app/Core/Services/Plan/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  planes: any[] = []
  nombrePagina: string;
  currentUser: UserLogueado;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private planService: PlanService
    , private authService: AuthService) { }

  ngOnInit() {

    this.planes = this.route.snapshot.data['planes'];
    console.log(this.planes)
  }

  ionViewWillEnter(){
    this.nombrePagina = 'Empresa.Planes';
    this.appDataService.changePageName(this.nombrePagina);
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

