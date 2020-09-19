import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController } from '@ionic/angular';
import { ControlService } from 'src/app/Core/Services/Control/control.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { UbicacionService } from 'src/app/Core/Services/Ubicacion/ubicacion.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { Medicion } from 'src/app/Models/Medicion';
import { MedicionService } from 'src/app/Core/Services/Mediciones/medicion.service';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.component.html',
  styleUrls: ['./mediciones.component.scss'],
})
export class MedicionesComponent implements OnInit {

  mediciones: any[]
  idControl: string
  idVisita: number
  currentUser: UserLogueado
  medicionesProcesadas: Medicion[] = []

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private router: Router, public navCtrl: NavController,
    private medicionService: MedicionService, private authService: AuthService,) { }

  ngOnInit() {

    this.appDataService.changePageName('General.Mediciones');

    this.mediciones = this.route.snapshot.data['mediciones'];

    this.idVisita = +this.route.snapshot.paramMap.get('id');
    this.idControl = this.route.snapshot.paramMap.get('idControl');

    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );

    //this.procesarMediciones();
  }

  private procesarMediciones(){

    this.mediciones.forEach(element => {
      
      const propiedades = Object.keys(element)

      propiedades.forEach(propiedad => {
        
        if(propiedad != 'idControl' && propiedad != 'id'){

          let medicion: Medicion ={
            nombre: propiedad,
            valor: element[propiedad]
          }

          this.medicionesProcesadas.push(medicion);

        }
      });
    });
  }

    
  doRefresh(event) {
    
    this.medicionService.obtenerMedicionesControl(this.idControl).subscribe(
      data => {
        this.mediciones = []
        this.mediciones = data
        this.medicionesProcesadas = []
        this.procesarMediciones()
      },
      (error) => console.log(error)

    )
    event.target.complete();
  }

}
