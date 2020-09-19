import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  empresas: any[] = [];

  nombrePagina: string;
  constructor(private appDataService: AppDataService, private translate: TranslateService, 
    private empresaService: EmpresaService, private route: ActivatedRoute,
    private toastController: ToastController) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.appDataService.changePageName('Empresa.title');

    this.empresas = this.route.snapshot.data['empresas']; 
    console.log(this.empresas)
  }

  onBorrarEmpresa(empresa: any){

    empresa.activo = false;
    this.empresaService.ActualizarEmpresa(empresa).subscribe(
      data => {
        this.empresas.splice(this.empresas.findIndex(e => e.id === empresa.id), 1 )
        this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Exito'))
      },
      (err: any) => this.MostrarMensajeOperacion(this.translate.instant('Mensaje.Falla'))
    )
  }

  async MostrarMensajeOperacion(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event) {
    
    this.empresaService.ObtenerEmpresas().subscribe(
      data => this.empresas = data,
      (error) => console.log(error)
    );
    event.target.complete();
  }

}
