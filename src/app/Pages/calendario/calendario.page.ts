import { Component, OnInit, Input } from '@angular/core';
import { EventoCalendario } from 'src/app/Models/EventoCalendario';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { LanguageService } from 'src/app/Core/Services/language-service.service';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  rerender;
  /* localizacion; */
  fechaNuevaSeleccionada: Date = new Date();
  horarioNuevoSeleccionado;

  fechaInicial = (new Date());
  fechaLimite = (new Date().setFullYear(this.fechaInicial.getFullYear() +1));

  eventSource = [];
  viewTitle;

  eventosEmpleado: EventoCalendario[] = [] 
  eventosEmpresa: EventoCalendario[] = [] 

  isToday:boolean;
  calendar = {
      mode: 'month',
      locale: this.languageService.selected,
      currentDate: new Date(),
      dateFormatter: {
          formatMonthViewDay: function(date:Date) {
              return date.getDate().toString();
          },
          formatMonthViewDayHeader: function(date:Date) {
              return 'MonMH';
          },
          formatMonthViewTitle: function(date:Date) {
              return 'testMT';
          },
          formatWeekViewDayHeader: function(date:Date) {
              return 'MonWH';
          },
          formatWeekViewTitle: function(date:Date) {
              return 'testWT';
          },
          formatWeekViewHourColumn: function(date:Date) {
              return 'testWH';
          },
          formatDayViewHourColumn: function(date:Date) {
              return 'testDH';
          },
          formatDayViewTitle: function(date:Date) {
              return 'testDT';
          }
      }
  };

  currentUser: UserLogueado;

  constructor(private translate: TranslateService, private route: ActivatedRoute, private visitaService: VisitaService,
    private appDataService: AppDataService,private router: Router, public navCtrl: NavController, public languageService: LanguageService,
    private authService: AuthService, private modalController: ModalController, private loader: LoaderService,
    private alertCtrl: AlertController) {}

  ngOnInit() {

    this.appDataService.changePageName('Calendario.title');

    this.eventosEmpleado = this.route.snapshot.data['eventosEmpleado'];
    this.eventosEmpresa = this.route.snapshot.data['eventosEmpresa'];
    this.eventSource = this.eventosEmpleado? this.eventosEmpleado: this.eventosEmpresa;

    console.log(this.eventosEmpleado)
    console.log(this.eventosEmpresa)
    
     this.authService.getUserSubject().pipe(first()).subscribe(
      data => {
        this.currentUser = data
      },
      error => console.log(error)
    )
  } 

  onViewTitleChanged(title) {
    console.log(title)
      this.viewTitle = title;
  }

  onViewWillenter(){
    this.appDataService.changePageName('Calendario.title');
  }
  async onEventSelected(event) {

      //this.fechaNuevaSeleccionada = event
        const alert = await this.alertCtrl.create({
          header: event.title,
          subHeader: event.desc,
          message: 'Desde: ' + event.startTime + '<br><br>Hasta: ' + event.endTime,
          buttons: ['OK'],
        });
        alert.present();
      
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  today() {
      this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {

    this.fechaNuevaSeleccionada = new Date(ev.selectedTime.toISOString().slice(0, -5))
    console.log(this.fechaNuevaSeleccionada)
      console.log('Selected time: ' + new Date(ev.selectedTime.toISOString().slice(0, -5)) + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event:Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }

  private obtenerVisitasEmpleado(){

    this.visitaService.obtenerVisitasPendientesEmpleado(this.currentUser.empleadoId).pipe(
      map(visitas => visitas.map(visita =>({
        title: visita.nombreCliente + ' - ' + visita.nombreEstablecimiento + ' - ' + visita.tipoVisita,
        allday: false,
        startTime: new Date(visita.fecha),
        endTime: new Date(new Date(visita.fecha).getTime() + (visita.duracion)*60000)
        })) 
      )
    ).subscribe(
      data => {
        this.eventosEmpleado = data
        this.eventSource = this.eventosEmpleado
        console.log(data)
      },
      (error) => console.log(error)
    )
  }


  private obtenerVisitasEmpresa(){

    this.visitaService.obtenerVisitasPendientesEmpresa(this.currentUser.empresaId).pipe(
      filter(visita=> visita.empleadoAsignado != 'NA'),
      map(visitas => visitas.map(visita =>({
          title: visita.nombreCliente + ' - ' + visita.nombreEstablecimiento + ' - ' + visita.tipoVisita,
          allday: false,
          startTime: new Date(visita.fecha),
          endTime: new Date(new Date(visita.fecha).getTime() + (visita.duracion)*60000),
          empleado: visita.empleadoAsignado
          })
        ) 
      )
);
  }
 
  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };
    
  doRefresh(event) {
    
    if (this.eventosEmpleado != null) this.obtenerVisitasEmpleado();
    if (this.eventosEmpresa != null) this.obtenerVisitasEmpresa();

    event.target.complete();
  }
}
