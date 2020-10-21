import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { IrregularidadService } from 'src/app/Core/Services/Irregularidad/irregularidad.service';
import { ClienteService } from 'src/app/Core/Services/Cliente/cliente.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-irregularidad',
  templateUrl: './irregularidad.page.html',
  styleUrls: ['./irregularidad.page.scss'],
})
export class IrregularidadPage implements OnInit {

  irregularidades:any[] = []
  currentUser: UserLogueado = null;
  clientes: any[]= [];
  clienteSeleccionado: any = null;
  establecimientos: any[]= [];
  establecimientoSeleccionado: any = null;

  filteredIrregularidades: any[] = []

  constructor(private translate: TranslateService, private route: ActivatedRoute,
    private appDataService: AppDataService, private irregularidadService: IrregularidadService,
    private authService: AuthService, public loaderService: LoaderService, private clienteService: ClienteService) { }

  ngOnInit() {}

  ionViewWillEnter() {

    this.appDataService.changePageName('Irregularidad.Title');

    this.irregularidades = this.route.snapshot.data['irregularidades'];
    this.clientes = this.route.snapshot.data['clientes'];  

    this.filteredIrregularidades = [...this.irregularidades];

    this.authService.getUserSubject().pipe(first()).subscribe(
      (res)=>{
      this.currentUser = res;
      },
      (error) => console.log(error)
    );
  }

  doRefresh(event) {

    this.irregularidades = []

    this.irregularidadService.ObtenerIrregularidades(this.currentUser.empresaId).subscribe(
      data => this.irregularidades = data,
      (error) => console.log(error)
    )

    event.target.complete();
  }

  onClienteSeleccionado(){

    if(this.clienteSeleccionado){
      this.establecimientoSeleccionado = null
      //this.seleccionUbicacionComponent.ubicacionSeleccionada = null

      this.clienteService.obtenerEstablecimientosActivosCliente(this.clienteSeleccionado.id).subscribe(
        data => this.establecimientos = data,
        (error) => console.log(error)
      )

      this.filteredIrregularidades = [...this.irregularidades].filter(irregularidad => 
        irregularidad.clienteId == this.clienteSeleccionado.id)

    }else{
      this.filteredIrregularidades = [...this.irregularidades]
    }
  }

  onEstablecimientoSeleccionado(){

    if(this.establecimientoSeleccionado){

      this.filteredIrregularidades = [...this.irregularidades]
        .filter(i => i.ubicacion.establecimientoId == this.establecimientoSeleccionado.id)

    }else{

      this.filteredIrregularidades = [...this.irregularidades].filter(i => i.clienteId == this.clienteSeleccionado.id) 
    }
  }

}
