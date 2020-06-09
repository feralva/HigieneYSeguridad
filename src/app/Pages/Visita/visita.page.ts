import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.page.html',
  styleUrls: ['./visita.page.scss'],
})
export class VisitaPage implements OnInit {
  nombrePagina;
  visitas: any[];
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,
    private visitaService: VisitaService, private authService: AuthService) { }

  ngOnInit() {
    this.nombrePagina = 'Visita.title';
    this.appDataService.changePageName(this.nombrePagina);

    this.visitas = this.route.snapshot.data['visitas'];
 
    console.log(this.visitas)
  }

}