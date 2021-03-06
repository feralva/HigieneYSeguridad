import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Empleado } from 'src/app/Models/Empleado';
import { Familia } from 'src/app/Models/Familia';
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
import { Plugins, CameraSource } from '@capacitor/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
const { Camera } = Plugins;
@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss'],
})
export class AltaEmpleadoComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  public nombrePagina: string;
  rolesDisponibles: Familia[];
  rolesSeleccionados: string[];
  currentUser: UserLogueado = null;
  imagenEmpleado: CameraPhoto = null;
  imageBase64: string;

  constructor(private rolService: RolService, private translate: TranslateService, 
                private appDataService: AppDataService, public photoService: PhotoService,
                private empleadoService: EmpleadoService, private authService: AuthService,
                public alertController: AlertController, private router: Router,
                public toastController: ToastController,
                private plt: Platform, private actionSheetCtrl: ActionSheetController) { }

  empleadoModel: Empleado = {
    id: 0,
    apellido: '',
    nombre: '',
    empresaId: null,
    correoElectronico: '',
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

    this.rolService.obtenerRolesDisponibles().subscribe(
      result => this.rolesDisponibles = result,
      (err: any) => console.log(err)
    );

    this.authService.getUserSubject().pipe(first()).subscribe(
        data => {
          console.log(data)
          this.currentUser = data
        },
        error => console.log(error)
    );
  }

  ionViewWillEnter(){
    this.appDataService.changePageName('Empleado.Alta.title');

  }
  async AltaEmpleadoConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Empleado.Alta.title'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Crear'),
      entidad: this.translate.instant('Empleado.Empleado')}),
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
            this.guardarImagenEmpleado(this.imageBase64,
              this.currentUser.empresaId, this.empleadoModel.usuario.IdUsuario).then(result => { 
                
                var rutaImagen = result.ref.getDownloadURL().then(
                  result =>{
                    this.empleadoModel.urlFoto = result
                    this.empleadoService.addEmpleado(this.empleadoModel).subscribe(
                      result => {                        
                        this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
                        this.router.navigate(['/empleado'])
                      },
                      (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
                    );
                  }
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

  guardarImagenEmpleado(imagen:string, idEmpresa:number, idUsuario:string){

    let ruta:string = environment.rutaFotosEmpleadosBase + `/${idEmpresa.toString()}/${idUsuario}.jpg`

    return this.photoService.uploadImage(imagen, ruta);
  }

  onSubmit(form: NgForm) {

    this.validarModelo();

    //console.log(this.currentUser)
    this.empleadoModel.empresaId = this.currentUser.empresaId
    this.empleadoModel.usuario = { IdUsuario: this.empleadoModel.correoElectronico
      , contraseña: this.authService.encriptarContrasenia(this.empleadoModel.contrasenia), UsuarioRoles: []};

    for (let rol of this.rolesSeleccionados) {
        this.empleadoModel.usuario.UsuarioRoles.push
          ({IdUsuario: this.empleadoModel.correoElectronico, IdFamilia: rol});
    }

    this.AltaEmpleadoConfirm()

  }
  
  validarModelo() {
    if(this.rolesSeleccionados.length == 0) throw new Error('Empleado.Error.Falta_Roles')
    
    if(!this.imageBase64)
      throw new Error('General.Error.Falta_Imagen');
  }

  async selectImageSource() {
    const buttons = [];

    buttons.push({
      text: this.translate.instant('SeleccionFuenteImagen.Camara'),
      icon: 'camera',
      handler: () => {
        this.addImage(CameraSource.Camera);
      }
    });
    
    // Only allow file selection inside a browser
    if (!this.plt.is('android') && !this.plt.is('iphone')) {
      buttons.push({
        text: this.translate.instant('SeleccionFuenteImagen.SistemaArchivos'),
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
    // Mostrar solo en dispositivo
    if (this.plt.is('android') || this.plt.is('iphone')) {
      buttons.push({
        text: this.translate.instant('SeleccionFuenteImagen.Galeria'),
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      });
    }
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('SeleccionFuenteImagen.Mensaje'),
      buttons
    });
    await actionSheet.present();
  }

  async addImage(source: CameraSource) {

    this.photoService.takePicture(source).then(result => {
      this.imagenEmpleado = result
      this.imageBase64 = result.dataUrl
    })
  }

    // Used for browser direct file upload
  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.imageBase64 = reader.result.toString();
    };

  }

}
