import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BajaTipoLicenciaComponent } from './baja-tipo-licencia.component';

describe('BajaTipoLicenciaComponent', () => {
  let component: BajaTipoLicenciaComponent;
  let fixture: ComponentFixture<BajaTipoLicenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaTipoLicenciaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BajaTipoLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
