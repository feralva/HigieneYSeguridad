import { Component, OnInit, Input } from '@angular/core';
import { EstablecimientoService } from 'src/app/Core/Services/Establecimiento/establecimiento.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { LanguageService } from 'src/app/Core/Services/language-service.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { Ubicacion } from 'src/app/Models/Ubicacion';

@Component({
  selector: 'app-ver-qr-ubicacion-modal',
  templateUrl: './ver-qr-ubicacion-modal.component.html',
  styleUrls: ['./ver-qr-ubicacion-modal.component.scss'],
})
export class VerQrUbicacionModalComponent implements OnInit {

  @Input() public ubicacion: Ubicacion;
  ubicacionStringficada: string;

  constructor(private translate: TranslateService, private route: ActivatedRoute, private establecimientoService: EstablecimientoService,
    private appDataService: AppDataService,private router: Router, public navCtrl: NavController,private languageService: LanguageService,
    private authService: AuthService, private modalController: ModalController, private loader: LoaderService,
    private alertCtrl: AlertController) { }

  ngOnInit() {

    this.ubicacionStringficada = JSON.stringify(this.ubicacion)
    console.log(this.ubicacionStringficada)
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
