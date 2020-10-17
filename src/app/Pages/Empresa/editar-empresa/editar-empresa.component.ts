import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CameraSource, CameraPhoto } from '@capacitor/core';
import { NgForm } from '@angular/forms';
import { Platform, ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { Empresa } from 'src/app/Models/Empresa';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { PhotoService } from 'src/app/Core/Services/photo/photo.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { DireccionService } from 'src/app/Core/Services/Direccion/direccion.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss'],
})
export class EditarEmpresaComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  imagenEmpleado: CameraPhoto = null;
  imageBase64: string;

  currentUser: UserLogueado = null;

  empresaModel: Empresa = {
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
    responsable: {
      apellido: '',
      nombre: '',
      correoElectronico: '',
      telefono: ''
    },
    urlFoto: '',
    activo: null
  };

  constructor(private appDataService: AppDataService, private translate: TranslateService, 
    private empresaService: EmpresaService, private photoService: PhotoService,
    public alertController: AlertController, private loaderService: LoaderService,
    public toastController: ToastController, private direccionService: DireccionService,
    private plt: Platform, private actionSheetCtrl: ActionSheetController,
    private route: ActivatedRoute, private router:Router,
    private authService: AuthService) { }

  set altura(altura:string){
    this.empresaModel.direccion.altura = +altura;
  }

  get altura(){
    return (this.empresaModel.direccion.altura)? this.empresaModel.direccion.altura.toString(): '';
  }

  ngOnInit() {

    this.obtenerInformacionEmpresa();
  }

  private obtenerInformacionEmpresa(){
    if(this.route.snapshot.data['empresa']){
      this.empresaModel =  this.route.snapshot.data['empresa'];
    }else{
      this.authService.getUserSubject().subscribe(
        data => {
          console.log(data)
          this.currentUser = data
          this.empresaService.obtenerEmpresa(data.empresaId).subscribe(
            data => this.empresaModel = data,
            (error) => console.log(error)
          )
        },
        error => console.log(error)
      );
    }
  }

  ionViewWillEnter(){

    this.appDataService.changePageName('Empresa.title');

    this.obtenerInformacionEmpresa();
    console.log(this.empresaModel)
  }

  onSubmit(form: NgForm) {
    console.log(this.empresaModel)
    this.ModificarEmpresaConfirm()
  }

  async ModificarEmpresaConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('Empresa.Editar.title'),
      message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Modificar'),
                                      entidad: this.translate.instant('Empresa.Empresa')}),
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
           
            if(this.imageBase64 != null){

              this.guardarImagenEmpresa(this.imageBase64,
                this.empresaModel.id).then(result => { 
                  
                  var rutaImagen = result.ref.getDownloadURL().then(
                    result =>{
                      this.empresaModel.urlFoto = result
                      this.ActualizarEmpresa();
                    }
                    );
                })
            }else{
              this.ActualizarEmpresa()
            }
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

  private ActualizarEmpresa() {
    this.empresaService.ActualizarEmpresa(this.empresaModel).subscribe(
      result => {
        this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
        this.router.navigate(['/home'])
      },
      (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
    );
  }

  guardarImagenEmpresa(imagen:string, idEmpresa: number){

    let ruta:string = environment.rutaFotosEmpresaBase + `/${idEmpresa.toString()}.jpg`

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
