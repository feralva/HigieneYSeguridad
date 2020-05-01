import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/Core/Services/language-service.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-language-popup',
  templateUrl: './language-popup.page.html',
  styleUrls: ['./language-popup.page.scss'],
})
export class LanguagePopupPage implements OnInit {

  languages = [];
  selected = '';

  constructor(private languageService: LanguageService, private popOverController: PopoverController) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.popOverController.dismiss();
  }


}
