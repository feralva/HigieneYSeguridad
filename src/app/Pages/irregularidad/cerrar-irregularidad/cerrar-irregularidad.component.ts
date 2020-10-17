import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { CameraPhoto, CameraSource } from '@capacitor/core';
import { RolService } from 'src/app/Core/Services/Rol/rol.service';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { PhotoService } from 'src/app/Core/Services/photo/photo.service';
import { IrregularidadService } from 'src/app/Core/Services/Irregularidad/irregularidad.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cerrar-irregularidad',
  templateUrl: './cerrar-irregularidad.component.html',
  styleUrls: ['./cerrar-irregularidad.component.scss'],
})
export class CerrarIrregularidadComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  public nombrePagina: string;
  rolesSeleccionados: any[]=[];
  currentUser: UserLogueado = null;
  imagenEvidenciaResolucion: CameraPhoto = null;
  imageBase64: string;

  constructor(private rolService: RolService, private translate: TranslateService, 
    private appDataService: AppDataService, public photoService: PhotoService,
    private irregularidadService: IrregularidadService, private authService: AuthService,
    public alertController: AlertController, private router: Router,
    public toastController: ToastController,private route: ActivatedRoute,
    private plt: Platform, private actionSheetCtrl: ActionSheetController) { }

  model: any;

  ngOnInit() {

    this.model = this.route.snapshot.data['irregularidad'][0];
    console.log(this.model)
    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
  }

  ionViewWillEnter(){

    this.appDataService.changePageName('Irregularidad.Completar_Irregularidad');
  }

  async CompletarIrregularidadConfirm() {
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: this.translate.instant('Irregularidad.Completar_Irregularidad'),
    message: this.translate.instant('Mensaje.Confirmacion',{accion: this.translate.instant('Accion.Completar'),
                                          entidad: this.translate.instant('Irregularidad.Title')}),
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

          if(this.imageBase64 != null){

            this.guardarImagenEvidenciaResultado().then(result => { 
                
                var rutaImagen = result.ref.getDownloadURL().then(
                  result =>{
                    this.model.urlEvidenciaResultado = result
                    console.log(this.model)
                    this.completarIrregularidad();
                  }
                  );
              })
          }else{
            this.completarIrregularidad()
          }
        }
      }
    ]
    });

    await alert.present();
  }

  private completarIrregularidad() {
    this.irregularidadService.completarIrregularidad(this.model).subscribe(
    result => {
      this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
      this.router.navigate(['/irregularidad'])
    },
    (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
    );
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  guardarImagenEvidenciaResultado(){

    let ruta:string = environment.rutaFotosEmpresaBase + 
    `/${this.currentUser.empresaId.toString()}/Clientes/${this.model.clienteId.toString()}/EvidenciaIrregularidades/Establecimientos/`+
    `${this.model.ubicacion.establecimientoId.toString()}/Ubicaciones/${this.model.ubicacion.id.toString() + this.model.id.toString()}.jpg`

    return this.photoService.uploadImage(this.imageBase64, ruta);
  }

  onSubmit(form: NgForm) {

    this.validarModelo();
    console.log(this.model)
    this.CompletarIrregularidadConfirm()
  }
  
  private validarModelo() {
    if(!this.imageBase64)
      throw new Error('Irregularidad.Error.Falta_Evidencia_Resolucion');
  }

  async selectImageSource() {
  const buttons = [];

  buttons.push(
                {
                  text: this.translate.instant('SeleccionFuenteImagen.Camara'),
                  icon: 'camera',
                  handler: () => {
                    this.addImage(CameraSource.Camera);
                  }
                }
              );
                
  if (this.plt.is('android') || this.plt.is('iphone')) {
    buttons.push(
                {
                  text: this.translate.instant('SeleccionFuenteImagen.Galeria'),
                  icon: 'image',
                  handler: () => {
                    this.addImage(CameraSource.Photos);
                  }
                });
  }

  if (!this.plt.is('android') && !this.plt.is('iphone')) {
    buttons.push({
      text: this.translate.instant('SeleccionFuenteImagen.SistemaArchivos'),
      icon: 'attach',
      handler: () => {
        this.fileInput.nativeElement.click();
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
      this.imagenEvidenciaResolucion = result
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
