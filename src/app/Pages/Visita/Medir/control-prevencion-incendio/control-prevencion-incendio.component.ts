import { Component, OnInit, ViewChild } from '@angular/core';
import { SeleccionarUbicacionControlComponent } from '../../seleccionar-ubicacion-control/seleccionar-ubicacion-control.component';
import { ToastController, LoadingController, Platform, AlertController } from '@ionic/angular';
import { ControlService } from 'src/app/Core/Services/Control/control.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { UbicacionService } from 'src/app/Core/Services/Ubicacion/ubicacion.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { Control } from 'src/app/Models/Control';
import { NgForm } from '@angular/forms';
import { ConnectionStatus, NetworkService } from 'src/app/Core/Services/network-service.service';

@Component({
  selector: 'app-control-prevencion-incendio',
  templateUrl: './control-prevencion-incendio.component.html',
  styleUrls: ['./control-prevencion-incendio.component.scss'],
})
export class ControlPrevencionIncendioComponent implements OnInit {

  idEstablecimiento: number;
  idVisita: number;
  ubicaciones: any[];
  model: any = {};
  
  @ViewChild(SeleccionarUbicacionControlComponent, { static: true }) seleccionUbicacionComponent: SeleccionarUbicacionControlComponent

  constructor(private toastCtrl: ToastController, private controlService: ControlService,
    private loadingCtrl: LoadingController,
    private plt: Platform, private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private ubicacionService: UbicacionService, 
    private authService: AuthService, public alertController: AlertController,
    private router: Router, private networkService: NetworkService) { }

  ngOnInit() {
    console.log(+this.route.snapshot.paramMap.get('id'))
    this.idVisita = +this.route.snapshot.paramMap.get('id')
    this.idEstablecimiento = +this.route.snapshot.paramMap.get('idEstablecimiento')
    this.ubicaciones = this.route.snapshot.data['ubicaciones'];
    
    
    this.appDataService.changePageName('Control.Incendio.title');
  }

  async AltaControlMedicionesConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Control.title'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Asociar'),
                                                              entidad: this.translate.instant('Control.Control')}),
      buttons: [
        {
          text: this.translate.instant('Mensaje.Cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {

            this.controlService.altaControlVisita(this.obtenerControl(), this.obtenerMediciones()).then(
              result => {
                this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
                this.router.navigate([`/visita/${this.idVisita}/detalle`])
              },
              (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
            );

            if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline){
              
              this.router.navigate(['/visita', this.idVisita, 'detalle'])
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private obtenerControl(): Control {
    return {
      fecha: new Date(),
      visitaId: this.idVisita,
      ubicacionId: this.seleccionUbicacionComponent.ubicacionSeleccionada.id,
      establecimientoId: this.idEstablecimiento
    };
  }

  private obtenerMediciones(): any[] {
    return [
      { valor: this.model.cantidadMatafuegos, nombre: this.translate.instant('Control.Incendio.CantidadMatafuegos') },
      { valor: this.model.cantidadSalidasEmergencia, nombre: this.translate.instant('Control.Incendio.CantidadSalidasEmergencia') },
      { valor: this.model.cantidadBaldesArena, nombre: this.translate.instant('Control.Incendio.CantidadBaldesDeArena') },
      { valor: this.model.matafuegosVencidos, nombre: this.translate.instant('Control.Incendio.MatafuegosVencidos') },
      { valor: this.model.espacioVentilado, nombre: this.translate.instant('Control.Incendio.EspacioVentilado') },
      { valor: this.model.proteccionesIgnifugas, nombre: this.translate.instant('Control.Incendio.ProteccionesIgnifugas') },
      { valor: this.model.detectoresDeHumo, nombre: this.translate.instant('Control.Incendio.DetectoresDeHumo') }
    ];
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  onSubmit(form: NgForm) {

    if(!this.seleccionUbicacionComponent.ubicacionSeleccionada) throw new Error('Control.Error.Falta_Ubicacion')

    this.AltaControlMedicionesConfirm()

  }
  
}
