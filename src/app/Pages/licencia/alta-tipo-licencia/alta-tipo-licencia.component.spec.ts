import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaTipoLicenciaComponent } from './alta-tipo-licencia.component';

describe('AltaTipoLicenciaComponent', () => {
  let component: AltaTipoLicenciaComponent;
  let fixture: ComponentFixture<AltaTipoLicenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaTipoLicenciaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaTipoLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
