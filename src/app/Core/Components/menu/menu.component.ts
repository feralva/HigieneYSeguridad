import { Component, OnInit } from '@angular/core';
import { ComponenteMenu } from '../../Models/ComponenteMenu';
import { MenuService } from '../../Services/menu.service';
import { Observable } from 'rxjs/internal/Observable';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public selectedIndex = 0;
  public MenuItems: Observable<ComponenteMenu>;
  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.MenuItems = this.menuService.ObtenerItemsMenuPrincipal();
  }

}
