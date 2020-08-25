import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { Empresa } from 'src/app/Models/Empresa';
import { Direccion } from 'src/app/Models/Direccion';
import { Responsable } from 'src/app/Models/Responsable';
import { NgForm } from '@angular/forms';
import { CameraPhoto } from '@capacitor/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Platform, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/Core/Services/photo/photo.service';
const { Camera } = Plugins;
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { DireccionService } from 'src/app/Core/Services/Direccion/direccion.service';
@Component({
  selector: 'app-alta-empresa',
  templateUrl: './alta-empresa.page.html',
  styleUrls: ['./alta-empresa.page.scss'],
})
export class AltaEmpresaPage implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  imagenEmpleado: CameraPhoto = null;
  imageBase64: string;

  partidos: any[];
  partidoSeleccionado: any;
  provincias: any[];
  provinciaSeleccionada: any;
  public nombrePagina: string;

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
    activo:true
  };

  constructor(private appDataService: AppDataService, private translate: TranslateService, 
    private empresaService: EmpresaService, private photoService: PhotoService,
    public alertController: AlertController, private loaderService: LoaderService,
    public toastController: ToastController, private direccionService: DireccionService,
    private plt: Platform, private actionSheetCtrl: ActionSheetController) { }

    set altura(altura:string){
      this.empresaModel.direccion.altura = +altura;
    }
  
    get altura(){
      return (this.empresaModel.direccion.altura)? this.empresaModel.direccion.altura.toString(): '';
    }

  ngOnInit() {

    this.direccionService.obtenerProvincias().subscribe(
      data => this.provincias = data,
      (error) => console.log(error)
    )
  }

  ionViewWillEnter(){
    this.nombrePagina = 'Empresa.title';
    this.appDataService.changePageName(this.nombrePagina);
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
    this.validarModel();
    this.empresaModel.direccion.partidoId = this.partidoSeleccionado.id;
    this.AltaEmpresaConfirm()
  }

  private validarModel() {
    if(!this.imageBase64)
      throw new Error("Debe Seleccionar Imagen");
  }

  async AltaEmpresaConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alta Empresa',
      message: '¿Esta seguro que desea crear Empresa?',
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
            this.empresaService.addEmpresa(this.empresaModel).subscribe(
              //(id: number) => console.log(id),
              data => {
                console.log(data)

                this.guardarImagenEmpresa(this.imageBase64, data.id).then(result => { 
                
                  var rutaImagen = result.ref.getDownloadURL().then(
                    result =>{
                      this.empresaModel.urlFoto = result;                      
                      this.empresaModel.id = data.id;                      
                      this.empresaService.ActualizarEmpresa(this.empresaModel).subscribe(
                        data => {
                          this.loaderService.dismiss();
                          this.MostrarMensajeOperacion('Alta Exitosa')
                        },
                        (err: any) => this.MostrarMensajeOperacion('Falla')
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

  altaEmpresa(){
    this.empresaService.addEmpresa(this.empresaModel).subscribe(
      result => console.log(result),
      (err: any) => console.log(err)
    );
  }

  guardarImagenEmpresa(imagen:string, idEmpresa: number){

    let ruta:string = environment.rutaFotosEmpresaBase + `/${idEmpresa.toString()}.jpg`

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
