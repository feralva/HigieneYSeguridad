import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';

@Component({
  selector: 'app-irregularidad',
  templateUrl: './irregularidad.page.html',
  styleUrls: ['./irregularidad.page.scss'],
})
export class IrregularidadPage implements OnInit {

  irregularidades:any[] = []
  currentUser: UserLogueado;

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, 
    private authService: AuthService, public loaderService: LoaderService) { }

    ngOnInit() {

      this.irregularidades = this.route.snapshot.data['irregularidades'];
      //this.estadosPlanesPosibles = this.route.snapshot.data['estadosPlanesPosibles'];
  
      this.authService.getUserSubject().subscribe(
        data => {
          this.currentUser = data
        },
        error => console.log(error)
      );
  
      console.log(this.irregularidades)
    }

  doRefresh(event) {

    this.irregularidades = []

    //var id = +this.route.snapshot.paramMap.get('id')

/*     this.planService.obtenerPlanesEmpresa(id).subscribe(
      data => this.planes = data,
      (error) => console.log(error)
    ); */

    event.target.complete();
  }

}
