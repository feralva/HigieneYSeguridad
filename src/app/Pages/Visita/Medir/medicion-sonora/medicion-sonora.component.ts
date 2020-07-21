import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { UbicacionService } from 'src/app/Core/Services/Ubicacion/ubicacion.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { SeleccionarUbicacionControlComponent } from '../../seleccionar-ubicacion-control/seleccionar-ubicacion-control.component';

@Component({
  selector: 'app-medicion-sonora',
  templateUrl: './medicion-sonora.component.html',
  styleUrls: ['./medicion-sonora.component.scss'],
})
export class MedicionSonoraComponent implements OnInit {

  idEstablecimiento: number;
  idVisita: number;
  ubicaciones: any[];
  
  @ViewChild(SeleccionarUbicacionControlComponent, { static: true }) seleccionUbicacionComponent: SeleccionarUbicacionControlComponent

  constructor(private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform, private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private ubicacionService: UbicacionService, 
    private authService: AuthService) { }

  ngOnInit() {
    this.idVisita = +this.route.snapshot.paramMap.get('idVisita')
    this.idEstablecimiento = +this.route.snapshot.paramMap.get('idEstablecimiento')
    this.ubicaciones = this.route.snapshot.data['ubicaciones'];
    
    
    this.appDataService.changePageName('Medicion.Sonora.Alta.Title');

    console.log(this.ubicaciones)
  }

}
