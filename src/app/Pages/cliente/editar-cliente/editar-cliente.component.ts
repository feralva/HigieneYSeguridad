import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CameraPhoto, CameraSource } from '@capacitor/core';
import { Cliente } from 'src/app/Models/Cliente';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { PhotoService } from 'src/app/Core/Services/photo/photo.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { DireccionService } from 'src/app/Core/Services/Direccion/direccion.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { GenericAlertMessageService } from 'src/app/Core/Services/generic-alert-message.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss'],
})
export class EditarClienteComponent implements OnInit {

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
      provinciaId: 0,
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
    private authService: AuthService, private msgService: GenericAlertMessageService,
    private route: ActivatedRoute, private router:Router) { }

  set altura(val: string){
    this.model.direccion.altura = +val;
  }

  get altura():string{
    return (this.model.direccion.altura)? this.model.direccion.altura.toString(): '';
  }
  
  ngOnInit() {

    this.model = this.route.snapshot.data['cliente'];

    this.direccionService.obtenerProvincias().subscribe(
      data => {
        this.provincias = data
        this.provinciaSeleccionada = this.provincias.find(p => p.id == this.model.direccion.provinciaId)

        this.direccionService.obtenerPartidosProvincia(this.model.direccion.provinciaId).subscribe(
          data => {
            this.partidos = data
            this.partidoSeleccionado = this.partidos.find(p => p.id == this.model.direccion.partidoId)
          }
        )
      },
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
    this.appDataService.changePageName('Cliente.EditarCliente.title');
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

    this.ActualizarClienteConfirm()
  }

  async ActualizarClienteConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Cliente.EditarCliente.title'),
      message:  this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Modificar'),
      entidad: this.translate.instant('Cliente.Cliente')}),
      buttons: [
        {
          text: this.translate.instant('Mensaje.Cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, 
        {
          text: 'Ok',
          handler: () => {

            if(this.imageBase64){

              this.guardarImagenCliente(this.imageBase64, this.model.empresaId, this.model.id).then(
                result => { 
                  var rutaImagen = result.ref.getDownloadURL().then(
                    result =>{
  
                      this.model.urlFoto = result;                        
                      this.actualizarCliente();
                    },
                    (err: any) => console.log(err)
                  )});   
            }else{
              this.actualizarCliente();
            }
            
          } 
        }]
      });
    await alert.present();
  }

  private actualizarCliente() {
    this.clienteService.ActualizarCliente(this.model).subscribe(
      data => {
        this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'));
        this.router.navigate(['/cliente']);
      },
      (err: any) => {
        this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'));
      }
    );
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


  guardarImagenCliente(imagen:string, idEmpresa: number, idCliente: number){

    let ruta:string = environment.rutaFotosEmpresaBase + `/${idEmpresa.toString()}` + `/Clientes` + `/${idCliente.toString()}.jpg`;

    return this.photoService.uploadImage(imagen, ruta);
  }

  async selectImageSource() {
    const buttons = [];

    if (!this.plt.is('android') && !this.plt.is('iphone')) {
      buttons.push({
        text: this.translate.instant('SeleccionFuenteImagen.SistemaArchivos'),
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
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
