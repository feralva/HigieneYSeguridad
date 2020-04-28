import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public NombrePagina: string;
  constructor() { }

  ngOnInit() {

    this.NombrePagina = 'Home';

  }

}
