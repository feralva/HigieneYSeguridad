import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { Empresa } from 'src/app/Models/Empresa';
import { Direccion } from 'src/app/Models/Direccion';
import { Responsable } from 'src/app/Models/Responsable';
import { NgForm } from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-alta-empresa',
  templateUrl: './alta-empresa.page.html',
  styleUrls: ['./alta-empresa.page.scss'],
})
export class AltaEmpresaPage implements OnInit {
  public nombrePagina: string;

  constructor(private appDataService: AppDataService, private translate: TranslateService, 
    private empresaService: EmpresaService) { }

  empresaModel: Empresa = {
    nombre: '',
    direccion: {
      calle: '',
      altura: null,
      partido: '',
      provincia: ''
    },
    responsable: {
      apellido: '',
      nombre: '',
      correoElectronico: '',
      telefono: ''
    }
  };

  ngOnInit() {
    this.nombrePagina = 'Empresa.title';
    this.appDataService.changePageName(this.nombrePagina);
  }

  onSubmit(form: NgForm) {

    this.empresaService.addEmpresa(this.empresaModel).subscribe(
      //(id: number) => console.log(id),
      result => console.log(result),
      (err: any) => console.log(err)
    );
  }
}
