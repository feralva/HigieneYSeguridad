import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { PhotoService } from 'src/app/Core/Services/photo/photo.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoMedicionService } from 'src/app/Core/Services/EquipoMedicion/equipo-medicion.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';

@Component({
  selector: 'app-modificar-cantidad-equipos-medicion',
  templateUrl: './modificar-cantidad-equipos-medicion.component.html',
  styleUrls: ['./modificar-cantidad-equipos-medicion.component.scss'],
})
export class ModificarCantidadEquiposMedicionComponent implements OnInit {

  tipoEquipo: any = {};
  cantidadAAgregar: number = 0;
  currentUser: UserLogueado;

  constructor(private translate: TranslateService, 
    private appDataService: AppDataService, public photoService: PhotoService,
    private authService: AuthService, private equipoMedicionService: EquipoMedicionService,
    public alertController: AlertController, private router: Router,
    public toastController: ToastController,private route: ActivatedRoute,
    private plt: Platform, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}

  ionViewWillEnter(){

    this.appDataService.changePageName('EquipoMedicion.Editar.title');
    this.tipoEquipo = this.route.snapshot.data['tipoEquipoMedicion'];
    //this.cantidadActual = this.tipoEquipo.cantidad;

    console.log(this.tipoEquipo)
    this.authService.getUserSubject().subscribe(
      data => {
        console.log(data)
        this.currentUser = data
      },
      error => console.log(error)
  );
  }

  async ModificarCantidadEquiposMedicionConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar Cantidad Equipos Medición',
      message: '¿Esta seguro que desea modificar Cantidad Equipo Medición?',
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

              this.modificarCantidadEquipoMedicion();

          }
        }
      ]
    });

    await alert.present();
  }

  modificarCantidadEquipoMedicion() {
    this.equipoMedicionService.actualizarCantidadEquiposMedicion(this.tipoEquipo.equipoMedicionNombre, this.currentUser.empresaId, this.cantidadAAgregar).subscribe(
      data => {
        this.MostrarMensajeOperacion('Actualizacion Exitosa')
        this.router.navigate(['/equiposMedicion'])
      },
      (error) => console.log(error)
    )
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  actualizarCantidadEquipoMedicion(){

/*     if(this. === this.tipoEquipo.cantidad){
      throw Error('No se Modifico Cantidad')
    } */

    this.ModificarCantidadEquiposMedicionConfirm();
  }

}
