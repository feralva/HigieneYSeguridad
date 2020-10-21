import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.page.html',
  styleUrls: ['./visita.page.scss'],
})
export class VisitaPage implements OnInit {
  nombrePagina;
  visitas: any[] = [];
  currentUser: UserLogueado;
  estadoVisitaAFiltrarId: number = 0;
  estadosVisitasPosibles: any[] = [];
  private _clienteAFiltrar: any = null;
  clientes: any[] = []
  
  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService,private router: Router, public navCtrl: NavController,
    private visitaService: VisitaService, private authService: AuthService,
    private loaderService: LoaderService) { }

  get clienteAFiltrar(): any {
    return this._clienteAFiltrar;
  }

  set clienteAFiltrar(clienteSeleccionado) {
    
    console.log('cliente seleccionado')
    console.log(clienteSeleccionado)
    this._clienteAFiltrar = clienteSeleccionado;

    this.actualizarVisitasPorFiltros(null)

  }

  ngOnInit() {}

  ionViewWillEnter(){

    this.appDataService.changePageName('Visita.title');

    this.visitas = this.route.snapshot.data['visitas'];
    this.clientes = this.route.snapshot.data['clientes'];
    this.estadosVisitasPosibles = this.route.snapshot.data['estados'];

    this.authService.getUserSubject().pipe(first()).subscribe(
      data => this.currentUser = data,
      error => console.log(error)
    );
    console.log(this.visitas)
  }

  doRefresh(event) {
    
    this.visitaService.obtenerVisitasEmpresa(this.currentUser.empresaId).subscribe(
      data => this.visitas = data,
      (error) => console.log(error)
    );
    event.target.complete();
  }

  actualizarVisitasPorFiltros(event){
    console.log('Actualizo visitas')
    this.visitas = [];

    this.loaderService.present(); 

    var idCliente = (this.clienteAFiltrar != null)?this.clienteAFiltrar.id: 0;
    
    this.visitaService.obtenerVisitasEmpresa(this.currentUser.empresaId , idCliente, this.estadoVisitaAFiltrarId).subscribe(
      data => {
        console.log(data)
        this.visitas = data;
        this.loaderService.dismiss();
      },
      (error) => console.log(error)
    )
  }
}
