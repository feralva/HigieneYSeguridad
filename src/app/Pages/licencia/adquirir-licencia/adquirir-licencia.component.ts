import { Component, OnInit } from '@angular/core';
import { LicenciaService } from 'src/app/Core/Services/Licencia/licencia.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/Core/Services/loader.service';

@Component({
  selector: 'app-adquirir-licencia',
  templateUrl: './adquirir-licencia.component.html',
  styleUrls: ['./adquirir-licencia.component.scss'],
})
export class AdquirirLicenciaComponent implements OnInit {

  tipoLicenciaSeleccionada: any = null
  tiposLicencias: any[] = []
  cantidadMeses: number = 1

  constructor(private appDataService: AppDataService,
    private translate: TranslateService,
    public alertController: AlertController,
    private route: ActivatedRoute, private loaderService: LoaderService,
    private licencia: LicenciaService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}
  
  ionViewWillEnter() {
    
    this.appDataService.changePageName("Licencia.Adquirir.title");
    this.tiposLicencias = this.route.snapshot.data['tiposLicencia'];
    
    console.log(this.tiposLicencias);
  }

  onTipoLicenciaSeleccionada(event){

    this.tipoLicenciaSeleccionada = event.target.value;
  }
}
