import { Component, OnInit } from '@angular/core';
import { EquipoMedicion } from 'src/app/Models/EquipoMedicion';
import { EquipoMedicionService } from 'src/app/Core/Services/EquipoMedicion/equipo-medicion.service';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { NgForm } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { TipoEquipoMedicion } from 'src/app/Models/TipoEquipoMedicion';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-alta-equipo-medicion',
  templateUrl: './alta-equipo-medicion.component.html',
  styleUrls: ['./alta-equipo-medicion.component.scss'],
})
export class AltaEquipoMedicionComponent implements OnInit {

  constructor(private equipoMedicionService: EquipoMedicionService, private translate: TranslateService, 
    private appDataService: AppDataService, private authService: AuthService,
    public alertController: AlertController, private router: Router,
    public toastController: ToastController) { }

  private _cantidad: number;
  equipoMedicionModel: EquipoMedicion =
  {
    activo: true,
    empresaId: null,
    nombre: null,
    tipoEquipoMedicionId: 0
  };
  tiposEquipoMedicion: TipoEquipoMedicion[];
  currentUser: UserLogueado = null;

  set cantidad(val:string){
    this._cantidad = +val;
  }

  get cantidad(){
    return (this._cantidad)? this._cantidad.toString(): '';
  }

  ngOnInit() {

    this.appDataService.changePageName('EquipoMedicion.Alta.title');

    this.authService.getUserSubject().pipe(first()).subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );

    this.equipoMedicionService.ObtenerTiposEquiposMedicionPosibles().subscribe(
      data => 
      {
        console.log(data)
        this.tiposEquipoMedicion = data
      },
      (error) => console.log(error)
    )

  }

  onTipoEquipoMedicionSelect(tipoEquipoMedicionId: string){

    this.equipoMedicionModel.tipoEquipoMedicionId = +tipoEquipoMedicionId;

  }

  obtenerEquiposMedicionAGuardar(): EquipoMedicion[]{

    let equiposMedicionAGuardar: EquipoMedicion[] = [];
    for(let i = 1; i <= this._cantidad; i++) {
      equiposMedicionAGuardar.push(this.equipoMedicionModel);
    }

    return equiposMedicionAGuardar;
  }

  async AltaEquipoMedicionConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('EquipoMedicion.Alta.title'),
      message:  this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Crear'),
                          entidad: this.translate.instant('EquipoMedicion.title')}),
      buttons: [
        {
          text: this.translate.instant('Mensaje.Cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {

            console.log(this.obtenerEquiposMedicionAGuardar())
            this.obtenerEquiposMedicionAGuardar().forEach(equipoMedicion => {
              this.equipoMedicionService.addEquipoMedicion(equipoMedicion).subscribe(
                result => {
                  this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
                  this.router.navigate(['/equiposMedicion'])
                },
                (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
              );
            });
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

    this.equipoMedicionModel.empresaId = this.currentUser.empresaId;
    console.log(this.equipoMedicionModel)
    this.AltaEquipoMedicionConfirm()
  }

}
