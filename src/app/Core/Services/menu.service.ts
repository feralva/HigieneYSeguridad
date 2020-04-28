import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponenteMenu } from '../Models/ComponenteMenu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  /**
   * ObtenerItemsMenuPrincipal
   */
  public ObtenerItemsMenuPrincipal() {
    return this.http.get<ComponenteMenu[]>('/assets/data/Menu.json');
  }
}
