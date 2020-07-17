import { Component, OnInit, Input } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitaService } from 'src/app/Core/Services/Visita/visita.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { LoaderService } from 'src/app/Core/Services/loader.service';
import { LanguageService } from 'src/app/Core/Services/language-service.service';
import { map, tap } from 'rxjs/operators';
import { EventoCalendario } from 'src/app/Models/EventoCalendario';
import { Visita } from 'src/app/Models/Visita';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cambiar-fecha-modal',
  templateUrl: './cambiar-fecha-modal.component.html',
  styleUrls: ['./cambiar-fecha-modal.component.scss'],
})
export class CambiarFechaModalComponent implements OnInit {

  fechaNuevaSeleccionada: Date;
  horarioNuevoSeleccionado;

  fechaInicial = (new Date());
  fechaLimite = (new Date().setFullYear(this.fechaInicial.getFullYear() +1));
  @Input() public idEmpleado: number;
  eventSource;
  viewTitle;

  eventosEmpleado: EventoCalendario[] = [] 

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
    private appDataService: AppDataService,private router: Router, public navCtrl: NavController,private languageService: LanguageService,
    private authService: AuthService, private modalController: ModalController, private loader: LoaderService,
    private alertCtrl: AlertController) {}

  ngOnInit() {

    console.log('llega')
    console.log(this.idEmpleado)

    this.authService.getUserSubject().subscribe(
      data => {
        this.currentUser = data
        this.obtenerVisitasEmpleado()
      },
      error => console.log(error)
    )//.add(() => this.loader.dismiss());

  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  onViewTitleChanged(title) {
    console.log(title)
      this.viewTitle = title;
  }

  async onEventSelected(event) {
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
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event:Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }

  private obtenerVisitasEmpleado(){

    this.visitaService.obtenerVisitasPendientesEmpleado(this.idEmpleado).pipe(
      map(visitas => visitas.map(visita =>({
        title: visita.nombreCliente + ' - ' + visita.nombreEstablecimiento + ' - ' + visita.tipoVisita,
        allday: false,
        startTime: new Date(visita.fecha),
        endTime: new Date(new Date(visita.fecha).getTime() + (visita.duracion * 60)*60000)
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
 
  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };

}
