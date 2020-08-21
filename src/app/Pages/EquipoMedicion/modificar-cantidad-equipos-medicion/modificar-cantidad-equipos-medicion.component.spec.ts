import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarCantidadEquiposMedicionComponent } from './modificar-cantidad-equipos-medicion.component';

describe('ModificarCantidadEquiposMedicionComponent', () => {
  let component: ModificarCantidadEquiposMedicionComponent;
  let fixture: ComponentFixture<ModificarCantidadEquiposMedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarCantidadEquiposMedicionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarCantidadEquiposMedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
