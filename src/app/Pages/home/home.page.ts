import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public nombrePagina: string;

  constructor(private appDataService: AppDataService, private translate: TranslateService) { }

  ngOnInit() {
    this.nombrePagina = 'Home.title';
    this.appDataService.changePageName(this.nombrePagina);
    }
}
