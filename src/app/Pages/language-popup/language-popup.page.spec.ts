import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LanguagePopupPage } from './language-popup.page';

describe('LanguagePopupPage', () => {
  let component: LanguagePopupPage;
  let fixture: ComponentFixture<LanguagePopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagePopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagePopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
