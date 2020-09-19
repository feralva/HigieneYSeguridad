import { Component, OnInit } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { LicenciaService } from 'src/app/Core/Services/Licencia/licencia.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private plt: Platform, private actionSheetCtrl: ActionSheetController,
    private router: Router) { }


  ngOnInit() {}

  ionViewWillEnter(){

    this.appDataService.changePageName('Licencia.Actualizar.title');

    this.tiposLicencias = this.route.snapshot.data['tiposLicencias'];

    var idTipoLicencia = +this.route.snapshot.paramMap.get('idTipoLicencia');
    
    if(idTipoLicencia){

      this.licenciaService.obtenerTipoLicenciaDetalle(idTipoLicencia).subscribe(
        data => {
          this.tipoLicenciaSeleccionado = this.tiposLicencias.find( t => t.id == data.id)
        } 
      )
    }

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
      header: this.translate.instant('Licencia.Actualizar.title'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Modificar'),
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
            this.licenciaService.actualizarPrecioLicencia(this.tipoLicenciaSeleccionado)
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

    this.tipoLicenciaSeleccionado.precioActual = this.precionuevo;

    this.ActualizarTipoLicenciaConfirm()
  }
}



