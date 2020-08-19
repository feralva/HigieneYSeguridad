import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { LicenciaService } from 'src/app/Core/Services/Licencia/licencia.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { Licencia } from 'src/app/Models/Licencia';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-licencia',
  templateUrl: './detalle-licencia.component.html',
  styleUrls: ['./detalle-licencia.component.scss'],
})
export class DetalleLicenciaComponent implements OnInit {

  licencia: Licencia = {
    id: 0,
    fechaFin: new Date(),
    empresa: {
      id: 0,
      direccion: {
        altura:0,
        calle: '',
        partido: null,
        partidoId: 0
      },
      nombre: '',
      responsable: null,
      urlFoto: ''
    },
    tipoLicencia: {
      Cantidad_Maxima_Usuarios: 0,
      id: 0,
      nombre: '',
      precioActual: 0
    }
  }
  currentUser: UserLogueado;

  constructor(private appDataService: AppDataService,
    private translate: TranslateService,
    public alertController: AlertController,
    private route: ActivatedRoute, private loaderService: LoaderService,
    private licenciaService: LicenciaService,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private toastController: ToastController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.appDataService.changePageName("Licencia.Detalle.title");
    this.licencia = this.route.snapshot.data['licencia'];
    
    this.authService.getUserSubject().subscribe(
      data => {
        this.currentUser = data
      },
      error => console.log(error)
    );
    console.log(this.licencia);
  }

}
