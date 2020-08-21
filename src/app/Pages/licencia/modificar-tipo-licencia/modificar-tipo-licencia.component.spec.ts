import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarTipoLicenciaComponent } from './modificar-tipo-licencia.component';

describe('ModificarTipoLicenciaComponent', () => {
  let component: ModificarTipoLicenciaComponent;
  let fixture: ComponentFixture<ModificarTipoLicenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarTipoLicenciaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarTipoLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
