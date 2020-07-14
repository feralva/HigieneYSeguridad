import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController } from '@ionic/angular';
import { ControlService } from 'src/app/Core/Services/Control/control.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { UbicacionService } from 'src/app/Core/Services/Ubicacion/ubicacion.service';

@Component({
  selector: 'app-visita-detalle',
  templateUrl: './visita-detalle.component.html',
  styleUrls: ['./visita-detalle.component.scss'],
})
export class VisitaDetalleComponent implements OnInit {

  controles: any[] = [];
  currentUser: UserLogueado;
  idVisita: number;
  visita: any;

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,private router: Router, public navCtrl: NavController,
    private controlService: ControlService, private authService: AuthService,
    private visitaService: VisitaService, private ubicacionService: UbicacionService) { }

  ngOnInit() {

    this.appDataService.changePageName('Visita.Detalle.title');

    this.controles = this.route.snapshot.data['controles'];
    this.visita = this.route.snapshot.data['visita'];

    this.idVisita = +this.route.snapshot.paramMap.get('id');

    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
 
    for(let control of this.controles){

      this.ubicacionService.obtenerUbicacion(control.ubicacionId).subscribe(
        data => {
          control.ubicacion = data.nombre
          console.log(control)
        },
        (error) => console.log(error)
      )
    }  

/*     this.ubicacionService.obtenerUbicacion(2).subscribe(
      data => console.log(data),
      (error) => console.log(error)
    ) */
    
    console.log(this.controles )
    console.log(this.visita)
  }

  doRefresh(event) {
    
    this.controlService.obtenerControlesVisita(this.idVisita).subscribe(
      data => this.controles = data,
      (error) => console.log(error)
    );
    event.target.complete();
  }

  redireccionarDetalleControl(){

    //TODO redireccionar a detalle dependiendo tipo de control
    /* console.log("navegando")
    //this.navCtrl.navigateForward(['/visita',id, 'detalle']);
    this.router.navigate(['/home']) */

  }

}
