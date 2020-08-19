import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActualizacionPrecioLicenciaComponent } from './actualizacion-precio-licencia.component';

describe('ActualizacionPrecioLicenciaComponent', () => {
  let component: ActualizacionPrecioLicenciaComponent;
  let fixture: ComponentFixture<ActualizacionPrecioLicenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizacionPrecioLicenciaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionPrecioLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
