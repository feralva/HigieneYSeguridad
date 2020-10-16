import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { first } from 'rxjs/operators';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  idEmpresa: number;
  datosEstadoVisitaEmpresa: any;
  datosClientesEmpresa: any[] = [];
  datosGraficosClientes: any[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    }
  };

  public pieChartLabels: Label[] = [this.translate.instant('DashBoard.Estado.Pendiente'), 
                                    this.translate.instant('DashBoard.Estado.Completa'),
                                    this.translate.instant('DashBoard.Estado.Cancelada')];
  public pieChartData: SingleDataSet = null;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private empresaService: EmpresaService, private route: ActivatedRoute, private authService: AuthService,
    private appDataService: AppDataService, private translate: TranslateService) {
/*     monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend(); */
  }

  ionViionViewWillEnter() {

    this.appDataService.changePageName('Dashboard.title');
  
  }

  ngOnInit(): void {

    this.authService.getUserSubject().pipe(first()).subscribe(
      data => this.idEmpresa = data.empresaId,
      error => console.log(error)
    );

    this.datosEstadoVisitaEmpresa = this.route.snapshot.data['totalizados'];
    this.datosClientesEmpresa = this.route.snapshot.data['clientes'];
    this.pieChartData = [ this.datosEstadoVisitaEmpresa.Pendiente, 
                          this.datosEstadoVisitaEmpresa.Completa, 
      this.datosEstadoVisitaEmpresa.Cancelada? this.datosEstadoVisitaEmpresa.Cancelada : 0]
    
    this.obtenerInformacionClientesParaGraficos();
  }

  obtenerInformacionClientesParaGraficos(){

    this.datosClientesEmpresa.forEach(
      async cli => {

        await this.empresaService.obtenerInformacionVisitasPorEstadoCliente(cli.id).toPromise().then(
          tot => {
            let arr = [];  
            /* Object.keys(tot).map(function(key){  
                arr.push(tot[key])  
                return arr;  
            });  */

            if(tot['Pendiente']){
              arr.push(tot['Pendiente'])
            }else arr.push(0)
            if(tot['Completa']){
              arr.push(tot['Completa'])
            } else arr.push(0)
            if(tot['Cancelada']){
              arr.push(tot['Cancelada'])
            } else arr.push(0)
            
            this.datosGraficosClientes.push({nombre: cli.nombre, datos: arr})
          }
        )

        console.log(this.datosGraficosClientes)
      }
    )
  }

  doRefresh(event) {

    this.empresaService.obtenerInformacionVisitasPorEstado(this.idEmpresa).subscribe(
      data => {
        this.datosEstadoVisitaEmpresa = data
        event.target.complete();
      }
    )
  }
}