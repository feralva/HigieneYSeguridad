import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { PhotoService } from 'src/app/Core/Services/photo/photo.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { DireccionService } from 'src/app/Core/Services/Direccion/direccion.service';
import { ActionSheetController, AlertController, ToastController, Platform } from '@ionic/angular';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { environment } from 'src/environments/environment';
import { CameraPhoto } from '@capacitor/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Cliente } from 'src/app/Models/Cliente';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { NgForm } from '@angular/forms';
const { Camera } = Plugins;
@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.scss'],
})
export class AltaClienteComponent implements OnInit {
  
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  imagenEmpleado: CameraPhoto = null;
  imageBase64: string;
  currentUser: any;

  partidos: any[];
  partidoSeleccionado: any;
  provincias: any[];
  provinciaSeleccionada: any;
  model: Cliente = {
    id: 0,
    nombre: '',
    direccion: {
      calle: '',
      altura: null,
      partidoId: 0,
      partido: {
        nombre: "",
        provinciaId: null,
        provincia: {
          nombre: ""
        }
      }
    },
    empresaId: 0,
    responsable: {
      apellido: '',
      nombre: '',
      correoElectronico: '',
      telefono: ''
    },
    urlFoto: ''
  };
  
  constructor(private appDataService: AppDataService, private translate: TranslateService, 
    private clienteService: ClienteService, private photoService: PhotoService,
    public alertController: AlertController, private loaderService: LoaderService,
    public toastController: ToastController, private direccionService: DireccionService,
    private plt: Platform, private actionSheetCtrl: ActionSheetController,
    private authService: AuthService) { }



  ngOnInit() {

    this.direccionService.obtenerProvincias().subscribe(
      data => this.provincias = data,
      (error) => console.log(error)
    )
    this.authService.getUserSubject().subscribe(
      data => {
        this.currentUser = data
        this.model.empresaId = data.empresaId
      },
      error => console.log(error)
    );
  }

  ionViewWillEnter(){
    this.appDataService.changePageName('Cliente.Alta.title');
  }

  actualizarPartidos(event){
    console.log('Actualizo Partidos')
    this.partidos = [];
    this.partidoSeleccionado = null;
    this.loaderService.present(); 
    console.log(event)
    this.direccionService.obtenerPartidosProvincia(event.id).subscribe(
      data => {
        this.partidos = data;
        this.loaderService.dismiss();
      },
      (error) => console.log(error)
    )
  }
  onSubmit(form: NgForm) {
    this.model.direccion.partidoId = this.partidoSeleccionado.id;
    console.log(this.model)
    this.AltaClienteConfirm()
  }

  async AltaClienteConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alta Cliente',
      message: '¿Esta seguro que desea crear Cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, 
        {
          text: 'Ok',
          handler: () => {

            this.loaderService.present();
            this.clienteService.addCliente(this.model).subscribe(
              //(id: number) => console.log(id),
              data => {
                console.log(data)
                this.guardarImagenCliente(this.imageBase64, this.model.empresaId, data.id).then(result => { 
                  console.log('imagen guardada')
                  //console.log(result.ref.getDownloadURL())
                  var rutaImagen = result.ref.getDownloadURL().then(
                    result =>{
                      console.log('Ruta imagen')
                      console.log(result)
                      this.model.urlFoto = result;                      
                      this.model.id = data.id;                      
                      this.clienteService.ActualizarCliente(this.model).subscribe(
                        data => {
                          this.loaderService.dismiss();
                          this.MostrarMensajeOperacion('Alta Exitosa')
                        },
                        (err: any) => {
                          this.loaderService.dismiss();
                          this.MostrarMensajeOperacion('Falla')
                        }
                      )},
                    (err: any) => console.log(err)
                    )});
              },
              (err: any) => console.log(err)
            );
          }      
    }]});

    await alert.present();
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  altaCliente(){
    this.clienteService.addCliente(this.model).subscribe(
      //(id: number) => console.log(id),
      result => console.log(result),
      (err: any) => console.log(err)
    );
  }

  guardarImagenCliente(imagen:string, idEmpresa: number, idCliente: number){

    let ruta:string = environment.rutaFotosEmpresaBase + `/${idEmpresa.toString()}` + `/Clientes` + `/${idCliente.toString()}.jpg`;

    return this.photoService.uploadImage(imagen, ruta);
  }

  async selectImageSource() {
    const buttons = [];



 
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
    if (this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose From Gallery',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
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
