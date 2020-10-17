import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { UbicacionService } from 'src/app/Core/Services/Ubicacion/ubicacion.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import jsQR from 'jsqr';

@Component({
  selector: 'buscar-ubicacion',
  templateUrl: './buscar-ubicacion.component.html',
  styleUrls: ['./buscar-ubicacion.component.scss'],
})
export class BuscarUbicacionComponent implements OnInit {

  @Input() ubicaciones: any[];
  ubicacionSeleccionada: any;

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;
 
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  loading: HTMLIonLoadingElement = null;
 
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform, private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private ubicacionService: UbicacionService, 
    private authService: AuthService
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
  }
 
  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }
 
  // Helper functions
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }
 
  reset() {
    this.scanResult = null;
  }
 
  stopScan() {
    this.scanActive = false;
  }

  ngOnInit() { }

  obtenerUbicacionPorQr(dataDeQR: any){

    var ubicacion = JSON.parse(dataDeQR)

    if(ubicacion.id) return ubicacion
    else throw Error('General.Error.QR_Invalido')
  }

  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
   
    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);
   
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
   
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }
   
  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
   
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
   
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
   
      if (code) {
        this.scanActive = false;

        this.ubicacionSeleccionada = this.obtenerUbicacionPorQr(code.data)
        this.scanResult = code.data;
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

}
