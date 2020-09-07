import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { EmpresaService } from 'src/app/Core/Services/Empresa/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { first } from 'rxjs/operators';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  idEmpresa: number;
  datosEstadoVisitaEmpresa: any;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    }
  };
  public pieChartLabels: Label[] = ['Pendiente', 'Completa', 'Cancelada'];
  public pieChartData: SingleDataSet = null;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private empresaService: EmpresaService, private route: ActivatedRoute, private authService: AuthService,
    private appDataService: AppDataService) {
/*     monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend(); */
  }

  ionViionViewWillEnter() {

    this.appDataService.changePageName('Dashboard.Title');
  
  }

  ngOnInit(): void {

    this.authService.getUserSubject().pipe(first()).subscribe(
      data => this.idEmpresa = data.empresaId,
      error => console.log(error)
    );

    this.datosEstadoVisitaEmpresa = this.route.snapshot.data['totalizados'];
    this.pieChartData =[ this.datosEstadoVisitaEmpresa.Pendiente, 
      this.datosEstadoVisitaEmpresa.Completa, 
      this.datosEstadoVisitaEmpresa.Cancelada? this.datosEstadoVisitaEmpresa.Cancelada : 0]
    
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