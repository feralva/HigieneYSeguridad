import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CameraSource, CameraPhoto } from '@capacitor/core';
import { NgForm } from '@angular/forms';
import { Empleado } from 'src/app/Models/Empleado';
import { RolService } from 'src/app/Core/Services/Rol/rol.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { EmpleadoService } from 'src/app/Core/Services/Empleado/empleado.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PhotoService } from 'src/app/Core/Services/photo/photo.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { Familia } from 'src/app/Models/Familia';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-empleado-edicion',
  templateUrl: './empleado-edicion.component.html',
  styleUrls: ['./empleado-edicion.component.scss'],
})
export class EmpleadoEdicionComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  public nombrePagina: string;
  rolesDisponibles: Familia[];
  rolesSeleccionados: any[]=[];
  currentUser: UserLogueado = null;
  imagenEmpleado: CameraPhoto = null;
  imageBase64: string;

  constructor(private rolService: RolService, private translate: TranslateService, 
                private appDataService: AppDataService, public photoService: PhotoService,
                private empleadoService: EmpleadoService, private authService: AuthService,
                public alertController: AlertController,
                public toastController: ToastController,private route: ActivatedRoute,
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
      IdUsuario: '',
      UsuarioRoles: [],
      contraseña: null
    }
  };

  ngOnInit() {

    this.empleadoModel = this.route.snapshot.data['empleado'];
    console.log(this.empleadoModel)
    this.empleadoModel.usuario = {
      IdUsuario: '',
      UsuarioRoles: [],
      contraseña: null
    }
    this.empleadoModel.usuario.IdUsuario = this.empleadoModel.correoElectronico;
    this.rolesDisponibles = this.route.snapshot.data['roles'];
  
    

    this.empleadoModel.roles.forEach(rol => {

      this.rolesSeleccionados.push(
        this.rolesDisponibles.find( rolDisponible => rolDisponible.idFamilia === rol)
      );
    });


    
    this.authService.getUserSubject().subscribe(
        data => this.currentUser = data,
        error => console.log(error)
    );
  }

  ionViewWillEnter(){
    this.nombrePagina = 'Empleado.Editar.title';
    this.appDataService.changePageName(this.nombrePagina);

  }
  async ModificarEmpleadoConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar Empleado',
      message: '¿Esta seguro que desea modificar Empleado?',
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

            if(this.imageBase64 != null){

              this.guardarImagenEmpleado(this.imageBase64,
                this.currentUser.empresaId, this.empleadoModel.usuario.IdUsuario).then(result => { 
                  
                  var rutaImagen = result.ref.getDownloadURL().then(
                    result =>{
                      this.empleadoModel.urlFoto = result
                      this.ActualizarEmpleado();
                    }
                    );
                })
            }else{
              this.ActualizarEmpleado()
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private ActualizarEmpleado() {
    this.empleadoService.actualizarEmpleado(this.empleadoModel).subscribe(
      result => this.MostrarMensajeOperacion('Modificación Exitosa'),
      (err: any) => this.MostrarMensajeOperacion('Falla')
    );
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


    for (let rol of this.rolesSeleccionados) {
        this.empleadoModel.usuario.UsuarioRoles.push
          ({IdUsuario: this.empleadoModel.correoElectronico, IdFamilia: rol.idFamilia});
    }

    console.log(this.empleadoModel)
    this.ModificarEmpleadoConfirm()
  }

  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];
 
    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
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
