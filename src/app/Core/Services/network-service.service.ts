import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';

const { Network } = Plugins;

export enum ConnectionStatus {
  Online,
  Offline
}
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  
  constructor(private toastController: ToastController, private plt: Platform, private translate: TranslateService) {
    this.plt.ready().then(() => {
      this.initializeNetworkEvents();
    });
  }
 
  private async initializeNetworkEvents() {

    let status = await Network.getStatus();
    this.status.next(status.connected ? ConnectionStatus.Online : ConnectionStatus.Offline); 

    let handler = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);

      if(status.connected){
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }else{
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
  }
 
  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
 
    let connection = status == ConnectionStatus.Offline ? 'General.Estado_Offline' : 'General.Estado_Online';
    let toast = this.toastController.create({
      message: this.translate.instant('General.Reintentar',{estado: this.translate.instant(connection)}),
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());
  }
 
  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }
 
  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }
}
