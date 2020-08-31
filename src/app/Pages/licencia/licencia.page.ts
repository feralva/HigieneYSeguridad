import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.page.html',
  styleUrls: ['./licencia.page.scss'],
})
export class LicenciaPage implements OnInit {

  licenciasEmpresas: any[] = []

  constructor(private route: ActivatedRoute, private appDataService: AppDataService, 
    private translate: TranslateService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.appDataService.changePageName('Licencia.Title');

    this.licenciasEmpresas = this.route.snapshot.data['licencias'];
  }

  direccionarAPagos(idEmpresa){

    this.router.navigate(['/pago', idEmpresa])

  }

}
