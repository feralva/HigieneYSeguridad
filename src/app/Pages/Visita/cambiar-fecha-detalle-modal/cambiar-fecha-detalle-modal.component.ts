import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { DateService } from 'src/app/Core/Services/Utils/date.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cambiar-fecha-detalle-modal',
  templateUrl: './cambiar-fecha-detalle-modal.component.html',
  styleUrls: ['./cambiar-fecha-detalle-modal.component.scss'],
})
export class CambiarFechaDetalleModalComponent implements OnInit {

  @Input() public fecha;
  @Input() public idVisita: number;
  horaInicio;
  horaFin;

  constructor(private translate: TranslateService, private route: ActivatedRoute, private visitaService: VisitaService,
    private appDataService: AppDataService, private router: Router, public navCtrl: NavController,
    private authService: AuthService, private modalController: ModalController, private loader: LoaderService,
    private alertCtrl: AlertController, private dateService: DateService) {}

  ngOnInit() {

    //this.fecha = this.dateService.convertirFechaAStringFormatoDDMMYYYY(this.fecha)

  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  guardarFechaVisita(){

    this.visitaService.actualizarFechaVisita(this.idVisita, 
      this.dateService.combinarFechaHora(this.dateService.ObtenerFechaDeString(this.fecha),this.dateService.ObtenerFechaDeString(this.horaInicio)), 
      this.dateService.obtenerDiferenciaEnMinutos(this.dateService.ObtenerFechaDeString(this.horaInicio), 
      this.dateService.ObtenerFechaDeString(this.horaFin))).subscribe(
        data =>{
          console.log(data)
          this.closeModal()
        } ,
        (error) => console.log(error)
      )

  }
}
