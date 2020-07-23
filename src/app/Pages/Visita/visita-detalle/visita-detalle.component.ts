import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController, ModalController } from '@ionic/angular';
import { ControlService } from 'src/app/Core/Services/Control/control.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { UbicacionService } from 'src/app/Core/Services/Ubicacion/ubicacion.service';
import { CambiarAuditorModalComponent } from '../cambiar-auditor-modal/cambiar-auditor-modal.component';
import { CambiarFechaModalComponent } from '../cambiar-fecha-modal/cambiar-fecha-modal.component';

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
    private visitaService: VisitaService, private ubicacionService: UbicacionService,
    private modalController: ModalController) { }

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

    console.log(this.controles )
    console.log(this.visita)
  }

  doRefresh(event) {

    this.visitaService.obtenerVisitaDetalle(+this.route.snapshot.paramMap.get('id')).subscribe(
      data => this.visita = data,
      (error) => console.log(error)
    )
    
    this.controlService.obtenerControlesVisita(this.idVisita).subscribe(
      data => this.controles = data,
      (error) => console.log(error)
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
    event.target.complete();
  }

  redireccionarDetalleControl(){

    //TODO redireccionar a detalle dependiendo tipo de control
    /* console.log("navegando")
    //this.navCtrl.navigateForward(['/visita',id, 'detalle']);
    this.router.navigate(['/home']) */

  }

  async onEditarFechaClick(event){
    const modal = await this.modalController.create({
      component: CambiarFechaModalComponent,
      componentProps: {
        idEmpleado: this.currentUser.empleadoId,
        idVisita: this.idVisita
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      //ver el param que paso
      this.doRefresh(modal);
    });  
    
    return await modal.present().then(_ => {
      console.log('Sending: ',  this.currentUser.empleadoId);
    });
  }

  onAgregarControl(){

    switch (this.visita.tipoVisita.descripcion) {
      case 'Sonido':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionSonora', 'alta'])
          break;
      case 'Luz':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionLuz', 'alta'])
          break;
      case 'Incendio':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionIncendio', 'alta'])
          break;
      case 'Emision Gases':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionEmisionGases', 'alta'])
          break;
      case 'Electrica':
          this.router.navigate(['/visita',this.idVisita, 'controles', this.visita.establecimiento.id, 'medicionElectrica', 'alta'])
          break;
    }
    

  }

  completarVisita(){

    //TODO agregar logica de completar... o agregar redireccion a pantalla detalle controles visita
  }
  async onEditarAuditorClick(event){

      const modal = await this.modalController.create({
        component: CambiarAuditorModalComponent,
        componentProps: {
          auditorActual: this.visita.empleado,
          idVisita: this.visita.id
        }
      });

      modal.onWillDismiss().then(dataReturned => {
        // trigger when about to close the modal
        //ver el param que paso
        this.doRefresh(modal);
      });  
      
      return await modal.present().then(_ => {
        // triggered when opening the modal
        console.log(this.visita)
        console.log('Sending: ',  this.visita.empleado);
      });
  }

}
