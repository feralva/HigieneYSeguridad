import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { LicenciaService } from 'src/app/Core/Services/Licencia/licencia.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tipos-licencia',
  templateUrl: './tipos-licencia.component.html',
  styleUrls: ['./tipos-licencia.component.scss'],
})
export class TiposLicenciaComponent implements OnInit {

  tiposLicencias: any[] = [];
  currentUser: UserLogueado;
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private licenciaService: LicenciaService,
    private authService: AuthService, public loaderService: LoaderService,
    private toastController: ToastController) { }

  ngOnInit() {}

  ionViewWillEnter() {

    this.appDataService.changePageName('Licencia.Tipo_Licencia');

    this.tiposLicencias = this.route.snapshot.data['tiposLicencias'];

    console.log(this.tiposLicencias)
    this.authService.getUserSubject().pipe(first()).subscribe(
      (res)=>{
        this.currentUser = res;
      },
      (error) => console.log(error)
    );
  }

  doRefresh(event) {

    this.tiposLicencias = []

    this.licenciaService.obtenerTiposLicencia().subscribe(
      data => this.tiposLicencias = data,
      (error) => console.log(error)
    )

    event.target.complete();
  }

  onDeshabilitarTipoLicencia(tipoLicencia: any){

    tipoLicencia.activo = false;

    this.licenciaService.modificarTipoLicencia(tipoLicencia).subscribe(
      data => {
        this.tiposLicencias.splice( this.tiposLicencias.findIndex(t => t.id == tipoLicencia.id) , 1)
        this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
      },
      (error) => console.log(error)
    )
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


}
