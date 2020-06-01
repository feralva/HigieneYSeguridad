import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaEquipoMedicionComponent } from './alta-equipo-medicion.component';

describe('AltaEquipoMedicionComponent', () => {
  let component: AltaEquipoMedicionComponent;
  let fixture: ComponentFixture<AltaEquipoMedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEquipoMedicionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaEquipoMedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
