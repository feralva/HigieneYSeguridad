import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  pagosEmpresas: any[];

  constructor(private route: ActivatedRoute, private appDataService: AppDataService, 
    private translate: TranslateService, private router: Router) { }

  ionViewWillEnter() {
    this.appDataService.changePageName('Licencia.Pagos');

    this.pagosEmpresas = this.route.snapshot.data['pagos'];
  }

  ngOnInit() {
  }

}
