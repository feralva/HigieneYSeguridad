import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public obtenerDiferenciaEnMinutos(fechaOrigen: Date, fechaDestino: Date){

    var dif = (fechaDestino.getTime() - fechaOrigen.getTime())

    return Math.round((dif/1000)/60); // minutes
  }

  combinarFechaHora(date, time) {
    
    var timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();
    var dateString = '' + year + '-' + month + '-' + day;
    var combined = new Date(dateString + ' ' + timeString);

    return combined;
  }

  ObtenerFechaSinHoraDeString(fecha){
    return new Date(fecha +'T00:00:00.000-03:00');
  }
  
  ObtenerFechaDeString(fecha){

    var fechaDate = new Date(fecha);

    var userTimezoneOffset = fechaDate.getTimezoneOffset() * 60000;
    return new Date(fechaDate.getTime() - userTimezoneOffset);

  }

  convertirFechaAStringFormatoDDMMYYYY(fecha: Date){

    var dia = ("0" + fecha.getDate().toString()).slice(-2).toString()
    var mes = ("0" + (fecha.getMonth() + 1).toString()).slice(-2).toString()
    var anio = fecha.getFullYear().toString()

    return dia +'/' + mes +'/' + anio
  }
}
