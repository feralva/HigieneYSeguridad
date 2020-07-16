import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';

@Component({
  selector: 'app-visita-editar',
  templateUrl: './visita-editar.component.html',
  styleUrls: ['./visita-editar.component.scss'],
})
export class VisitaEditarComponent implements OnInit {

  visita:any
  currentUser: UserLogueado
  idVisita: number

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private router: Router, public navCtrl: NavController,
    private authService: AuthService, private visitaService: VisitaService) { }

  ngOnInit() {

    this.appDataService.changePageName('Visita.Editar.title');

    this.visita = this.route.snapshot.data['visita'];

    this.idVisita = +this.route.snapshot.paramMap.get('id');

    this.authService.getUserSubject().subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
  }

  doRefresh(event) {

    this.visitaService.obtenerVisitaDetalle(+this.route.snapshot.paramMap.get('id')).subscribe(
      data => this.visita = data,
      (error) => console.log(error)
    )

    event.target.complete();
  }
}
