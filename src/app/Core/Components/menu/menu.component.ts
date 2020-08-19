import { Component, OnInit } from '@angular/core';
import { ComponenteMenu } from '../../Models/ComponenteMenu';
import { MenuService } from '../../Services/menu.service';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public selectedIndex = 0;
  public MenuItems: ComponenteMenu[];
  currentUser: any;

  constructor(private menuService: MenuService, private authService: AuthService) {}

  ngOnInit() {
    //this.MenuItems = this.menuService.ObtenerItemsMenuPrincipal();

    this.authService.getUserSubject().subscribe(
      data => {
        //console.log('cambio User Logueado')
        this.currentUser = data
        this.MenuItems = null;
        this.menuService.ObtenerItemsMenuPrincipal().subscribe(
          data => this.MenuItems = data,
          (error) => console.log(error)
        );
        console.log(this.MenuItems)
      },
      error => console.log(error)
    );

  }
  logOut(){
    this.authService.logout()
  }
}

