import { Component, OnInit } from '@angular/core';
import { TipoLicencia } from 'src/app/Models/TipoLicencia';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { LicenciaService } from 'src/app/Core/Services/Licencia/licencia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modificar-tipo-licencia',
  templateUrl: './modificar-tipo-licencia.component.html',
  styleUrls: ['./modificar-tipo-licencia.component.scss'],
})
export class ModificarTipoLicenciaComponent implements OnInit {

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
    private plt: Platform, private actionSheetCtrl: ActionSheetController,
    private route: ActivatedRoute) { }

  ngOnInit() {}

  ionViewWillEnter(){

    this.appDataService.changePageName('TipoLicencia.Modificar.title');

    this.tipoLicencia = this.route.snapshot.data['tipoLicencia'];

    this.authService.getUserSubject().subscribe(
      data => {
        console.log(data)
        this.currentUser = data
      },
      error => console.log(error)
    );
  }

  async ModificarTipoLicenciaConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar Tipo Licencia',
      message: '¿Esta seguro que desea Modificar Tipo Licencia?',
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
            this.licenciaService.modificarTipoLicencia(this.tipoLicencia)
              .subscribe(
                result => {
                  this.MostrarMensajeOperacion('Modificación Exitosa')
                  this.router.navigate(['/licencia', 'tipos'])
                },
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

    this.ModificarTipoLicenciaConfirm()
  }
}
