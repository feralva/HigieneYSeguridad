import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/Models/Empleado';
import { Familia } from 'src/app/Models/Familia';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioRol } from 'src/app/Models/UsuarioRol';
import { TranslateService } from '@ngx-translate/core';
import { RolService } from 'src/app/Core/Services/Rol/rol.service';
import { NgForm } from '@angular/forms';
import { EmpleadoService } from 'src/app/Core/Services/Empleado/empleado.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AlertController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/Core/Services/photo/photo.service';
import { CameraPhoto } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { PhotoCordovaService } from 'src/app/Core/Services/photo/photo-cordova.service';
@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss'],
})
export class AltaEmpleadoComponent implements OnInit {

  constructor(private rolService: RolService, private translate: TranslateService, 
                private appDataService: AppDataService, public photoService: PhotoService,
                public photoCordovaService: PhotoCordovaService,
                private empleadoService: EmpleadoService, private authService: AuthService,
                public alertController: AlertController,
                public toastController: ToastController) { }

  public nombrePagina: string;
  rolesDisponibles: Familia[];
  rolesSeleccionados: string[];
  currentUser: UserLogueado = null;
  imagenEmpleado: CameraPhoto = null;
  imageBase64: string;

  empleadoModel: Empleado = {
    apellido: '',
    nombre: '',
    empresaId: null,
    CorreoElectronico: '',
    contrasenia: '',
    urlFoto: '',
    activo: true,
    usuarioId:'',
    roles: [],
    usuario: {
      IdUsuario: null,
      UsuarioRoles: null,
      contraseña: null
    }
  };

  ngOnInit() {

    this.nombrePagina = 'Empleado.Alta.title';
    this.appDataService.changePageName(this.nombrePagina);

    this.rolService.obtenerRolesDisponibles().subscribe(
      result => this.rolesDisponibles = result,
      (err: any) => console.log(err)
    );

    this.authService.getUserSubject().subscribe(
        data => this.currentUser = data,
        error => console.log(error)
    );
  }

  async AltaEmpleadoConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alta Empleado',
      message: 'Message ¿Esta seguro que desea crear Empleado?',
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
            this.guardarImagenEmpleado(this.imageBase64,
              this.currentUser.empresaId, this.empleadoModel.usuario.IdUsuario).then(result => {             
                this.empleadoService.addEmpleado(this.empleadoModel).subscribe(
                  result => this.MostrarMensajeOperacion('Alta Exitosa'),
                  (err: any) => this.MostrarMensajeOperacion('Falla')
                );
              })
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

  tomarFotoEmpleado(){

    this.photoService.takePicture().then(result => {
      this.imagenEmpleado = result
      this.imageBase64 = result.dataUrl
    })
    
  }

  guardarImagenEmpleado(imagen:string, idEmpresa:number, idUsuario:string){

    let rutaBase: string =  environment.rutaFotosEmpleadosBase;

    let ruta:string = rutaBase + `/${idEmpresa.toString()}/${idUsuario}.jpg`

    return this.photoService.uploadImage(imagen, ruta);
  }

  onSubmit(form: NgForm) {

    this.empleadoModel.empresaId = this.currentUser.empresaId
    this.empleadoModel.usuario = { IdUsuario: this.empleadoModel.CorreoElectronico
      , contraseña: this.authService.encriptarContrasenia(this.empleadoModel.contrasenia), UsuarioRoles: []};

    for (let rol of this.rolesSeleccionados) {
        this.empleadoModel.usuario.UsuarioRoles.push
          ({IdUsuario: this.empleadoModel.CorreoElectronico, IdFamilia: rol});
    }

    this.AltaEmpleadoConfirm()

  }

}
