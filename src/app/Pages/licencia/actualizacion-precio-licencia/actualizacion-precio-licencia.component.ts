import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { LicenciaService } from 'src/app/Core/Services/Licencia/licencia.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-actualizacion-precio-licencia',
  templateUrl: './actualizacion-precio-licencia.component.html',
  styleUrls: ['./actualizacion-precio-licencia.component.scss'],
})
export class ActualizacionPrecioLicenciaComponent implements OnInit {

  tiposLicencias: any[];
  precionuevo: number;
  tipoLicenciaSeleccionado: any;
  currentUser: UserLogueado = null;
  
  constructor(private translate: TranslateService, 
    private appDataService: AppDataService, private authService: AuthService,
    public alertController: AlertController, private licenciaService: LicenciaService,
    public toastController: ToastController, private route: ActivatedRoute,
    private plt: Platform, private actionSheetCtrl: ActionSheetController) { }


  ngOnInit() {}

  ionViewWillEnter(){

    this.appDataService.changePageName('TipoLicencia.ActualizarPrecio.title');

    this.tiposLicencias = this.route.snapshot.data['tiposLicencias'];
    
    console.log(this.tiposLicencias)
    this.authService.getUserSubject().subscribe(
      data => {
        console.log(data)
        this.currentUser = data
      },
      error => console.log(error)
    );

  }

  async ActualizarTipoLicenciaConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Actualizar Precio Tipo Licencia',
      message: 'Message ¿Esta seguro que desea actualizar Precio de Tipo Licencia?',
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
            this.licenciaService.actualizarPrecioLicencia(this.tipoLicenciaSeleccionado)
              .subscribe(
                result => this.MostrarMensajeOperacion('Actualizacion Exitosa'),
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

  onSubmit(form: NgForm) {

    this.tipoLicenciaSeleccionado.precioActual = this.precionuevo;

    this.ActualizarTipoLicenciaConfirm()
  }
}



