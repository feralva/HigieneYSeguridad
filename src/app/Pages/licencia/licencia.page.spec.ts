import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LicenciaPage } from './licencia.page';

describe('LicenciaPage', () => {
  let component: LicenciaPage;
  let fixture: ComponentFixture<LicenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LicenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
