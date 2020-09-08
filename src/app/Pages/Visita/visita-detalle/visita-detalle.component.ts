import { Component, OnInit, OnDestroy } from '@angular/core';
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

import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MedicionService } from 'src/app/Core/Services/Mediciones/medicion.service';
import { ReportingService } from 'src/app/Core/Services/reporting-service.service';
import { EstablecimientoService } from 'src/app/Core/Services/Establecimiento/establecimiento.service';
import { forkJoin } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    public toastController: ToastController, private medicionService: MedicionService,
    private reportingService: ReportingService, private establecimientoService: EstablecimientoService) { }
  
    ionViewWillEnter(){
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
  
        //Convierto tipo de datos firestore en date
        if(control.fecha.seconds) control.fecha = new Date(control.fecha.seconds * 1000)
  
        this.ubicacionService.obtenerUbicacion(control.ubicacionId).subscribe(
          data => {
            control.ubicacion = data.nombre
            console.log(control)
          },
          (error) => console.log(error)
        )
      }
      
      this.ubicacionService.obtenerUbicacionesEstablecimiento(this.visita.establecimientoId).subscribe(
        data => console.log(data)
      );
  
      console.log(this.controles)
      console.log(this.visita) 
    }

  ngOnInit() {

    /* this.appDataService.changePageName('Visita.Detalle.title');

      this.controles = this.route.snapshot.data['controles'];
      this.visita = this.route.snapshot.data['visita'];
  
      this.idVisita = +this.route.snapshot.paramMap.get('id');
  
      this.authService.getUserSubject().subscribe(
        data => this.currentUser = data,
        error => console.log(error)
      );
   
      console.log(this.controles)
      for(let control of this.controles){
  
        //Convierto tipo de datos firestore en date
        if(control.fecha.seconds) control.fecha = new Date(control.fecha.seconds * 1000)
  
        this.ubicacionService.obtenerUbicacion(control.ubicacionId).subscribe(
          data => {
            control.ubicacion = data.nombre
            console.log(control)
          },
          (error) => console.log(error)
        )
      }  
  
      console.log(this.controles)
      console.log(this.visita) */
  }

  doRefresh(event) {

    this.visitaService.obtenerVisitaDetalle(+this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.visita = data
        this.controlService.obtenerControlesVisita(this.idVisita).subscribe(
          dataControles => {
            this.controles = dataControles
            for(let control of this.controles){

              //Convierto tipo de datos firestore en date
              if(control.fecha.seconds) control.fecha = new Date(control.fecha.seconds * 1000)

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
        if(event != null ) event.target.complete(); 
      },
      (error) => console.log(error)
    )
  }

  async onEditarFechaClick(){
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
      this.doRefresh(null);
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
      
      if(this.controles.length == 0) throw Error('Debe cargar Controles antes de completar Visita')

      this.completarVisitaConfirm();

    }
  }

  async onEditarAuditorClick(){

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
        this.doRefresh(null);
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
      message: '¿Esta seguro que desea completar Visita?',
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
                result => this.MostrarMensajeOperacion('Visita Completada'),
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

  generarPDF(){

    var tasks$ = [];

    this.controles.forEach(control => {
      
      tasks$.push(this.medicionService.obtenerMedicionesControl(control.id))
    });

    forkJoin(...tasks$).subscribe(
      results => { 
        console.log(results)
        
        var index = 0;
        results.forEach(mediciones => {
          this.controles[index].mediciones = mediciones
          index++         
        });
        this.visita.controles = this.controles;
        console.log(this.visita)
        this.establecimientoService.obtenerClienteDeEstablecimiento(this.visita.establecimiento.id).subscribe(
          data => {
            this.visita.cliente = data 
            this.reportingService.generarReporteVisita(this.visita)
          }
        )
      }
    );
  }

}
