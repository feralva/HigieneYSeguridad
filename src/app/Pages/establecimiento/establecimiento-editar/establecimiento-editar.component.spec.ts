import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstablecimientoEditarComponent } from './establecimiento-editar.component';

describe('EstablecimientoEditarComponent', () => {
  let component: EstablecimientoEditarComponent;
  let fixture: ComponentFixture<EstablecimientoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablecimientoEditarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstablecimientoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
