import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController, ModalController, AlertController, ToastController } from '@ionic/angular';
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
    private modalController: ModalController, public alertController: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {

    this.appDataService.changePageName('Visita.Detalle.title');

    this.controles = this.route.snapshot.data['controles'];
    this.visita = this.route.snapshot.data['visita'];

    this.idVisita = +this.route.snapshot.paramMap.get('id');

    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
 
    console.log(this.controles)
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
      data => {
        this.visita = data
        this.controlService.obtenerControlesVisita(this.idVisita).subscribe(
          dataControles => {
            this.controles = dataControles
            for(let control of this.controles){

              this.ubicacionService.obtenerUbicacion(control.ubicacionId).subscribe(
                dataUbicaciones => {
                  control.ubicacion = dataUbicaciones.nombre
                  console.log(control)
                  
                },
                (error) => console.log(error)
              )
            }
 
          },
          (error) => console.log(error)
        );
        event.target.complete(); 
      },
      (error) => console.log(error)
    )
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

    if(this.visita.empleado == null || this.visita.fecha == null ){

      this.alertaFaltaInformacion();

    }else{

      this.completarVisitaConfirm();

    }
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

  async completarVisitaConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Completar Visita',
      message: 'Message ¿Esta seguro que desea completar Visita?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.visitaService.completarVisita(this.idVisita).subscribe(
                result => this.MostrarMensajeOperacion('Alta Exitosa'),
                (err: any) => this.MostrarMensajeOperacion('Falla')
            );
          }     
        }
      ]
    });

    await alert.present();
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async alertaFaltaInformacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Datos Faltantes',
      message: 'La visita no se puede completar con la fecha o auditor sin Asignar',
      buttons: [
        {
          text: 'Ok',
          role: 'OK',
          cssClass: 'primary',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  cancelarVisita(){

    if(this.visita.estado.descripcion === 'Completa') throw Error('No se puede Cancelar Visita Completa')
    this.cancelarVisitaConfirm();
  }

  async cancelarVisitaConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cancelar Visita',
      message: '¿Esta seguro que desea cancelar Visita?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.visitaService.cancelarVisita(this.visita.id).subscribe(
                result => this.MostrarMensajeOperacion('Visita Cancelada'),
                (err: any) => this.MostrarMensajeOperacion('Falla')
            );
          }     
        }
      ]
    });

    await alert.present();
  }

  onAnularControl(idcontrol: string){
    console.log(idcontrol)

    this.controlService.bajaControl(idcontrol).then(
      res => {
        this.controles.splice(this.controles.find(control => control.id === idcontrol), 1 )
        this.MostrarMensajeOperacion('Baja Exitosa')
      }
    )
  }

}
