import { Component, OnInit } from '@angular/core';
import { LicenciaService } from 'src/app/Core/Services/Licencia/licencia.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { Pago } from 'src/app/Models/Pago';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { PagoService } from 'src/app/Core/Services/Pago/pago.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';

@Component({
  selector: 'app-adquirir-licencia',
  templateUrl: './adquirir-licencia.component.html',
  styleUrls: ['./adquirir-licencia.component.scss'],
})
export class AdquirirLicenciaComponent implements OnInit {

  tipoLicenciaSeleccionada: any = null
  tiposLicencias: any[] = []
  cantidadMeses: number = 1
  currentUser: UserLogueado = null;
  
  constructor(private appDataService: AppDataService,
    private translate: TranslateService, private router: Router,
    public alertController: AlertController,
    private route: ActivatedRoute, private loaderService: LoaderService,
    private actionSheetCtrl: ActionSheetController, private pagoService: PagoService,
    private authService: AuthService, private licenciaService: LicenciaService,
    private toastController: ToastController) { }

  ngOnInit() {}
  
  ionViewWillEnter() {
    
    this.appDataService.changePageName("Licencia.Adquirir.title");
    this.tiposLicencias = this.route.snapshot.data['tiposLicencia'];
    
    this.authService.getUserSubject().subscribe(
      data => {
        console.log(data)
        this.currentUser = data
      },
      error => console.log(error)
    );
    console.log(this.tiposLicencias);
  }

  onTipoLicenciaSeleccionada(event){

    this.tipoLicenciaSeleccionada = event.target.value;
  }



}
