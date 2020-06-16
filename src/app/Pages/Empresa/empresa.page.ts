import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  empresas: any[];

  nombrePagina: string;
  constructor(private appDataService: AppDataService, private translate: TranslateService, 
    private empresaService: EmpresaService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.empresas = this.route.snapshot.data['empresas'];
  
    console.log(this.empresas)
  }

  ionViewWillEnter(){
    this.nombrePagina = 'Empresa.title';
    this.appDataService.changePageName(this.nombrePagina);
  }

}
