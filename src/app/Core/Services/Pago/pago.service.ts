import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  registrarPago(pago:any) : Observable<any> {
    return this.http.post<any>(environment.UrlBaseApi + 'Pago', {Model: pago}, this.httpOptions); 
  }

  obtenerPagos(empresaId: number = null, idPago: number = null) : Observable<any[]> {

    let params = new HttpParams();
    
    if(empresaId) params = params.set('empresaId', empresaId.toString())
    if(idPago) params = params.set('idPago', idPago.toString())
    
    var httpOptions = 
      { ...this.httpOptions,
        params: params
      }
    return this.http.get<any[]>(environment.UrlBaseApi + 'Pago', this.httpOptions); 
  }
}
