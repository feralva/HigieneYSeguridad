import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LicenciaService } from 'src/app/Core/Services/Licencia/licencia.service';
import { NgForm } from '@angular/forms';
import { TipoLicencia } from 'src/app/Models/TipoLicencia';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-alta-tipo-licencia',
  templateUrl: './alta-tipo-licencia.component.html',
  styleUrls: ['./alta-tipo-licencia.component.scss'],
})
export class AltaTipoLicenciaComponent implements OnInit {

  tipoLicencia: TipoLicencia = {
    cantidad_Maxima_Usuarios: 0,
    id: 0,
    nombre: '',
    precioActual: 0,
    descripcion: '',
    activo: true
  }
  currentUser: UserLogueado = null;

  constructor(private translate: TranslateService, 
    private appDataService: AppDataService, private authService: AuthService,
    public alertController: AlertController, private licenciaService: LicenciaService,
    public toastController: ToastController, private router: Router,
    private plt: Platform, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}

  ionViewWillEnter(){

    this.appDataService.changePageName('Licencia.Alta_Tipo_Licencia');

    this.authService.getUserSubject().pipe(first()).subscribe(
      data => {
        console.log(data)
        this.currentUser = data
      },
      error => console.log(error)
    );

  }

  async AltaTipoLicenciaConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Licencia.Alta_Tipo_Licencia'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Crear'),
                                            entidad: this.translate.instant('Licencia.Licencia')}),
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
            this.licenciaService.AltaTipoLicencia(this.tipoLicencia)
              .subscribe(
                result => {
                  this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
                  this.router.navigate(['/licencia', 'tipos'])
                },
                (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
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

    this.AltaTipoLicenciaConfirm()
  }
}
