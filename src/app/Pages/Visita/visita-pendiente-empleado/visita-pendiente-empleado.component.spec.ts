import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitaPendienteEmpleadoComponent } from './visita-pendiente-empleado.component';

describe('VisitaPendienteEmpleadoComponent', () => {
  let component: VisitaPendienteEmpleadoComponent;
  let fixture: ComponentFixture<VisitaPendienteEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitaPendienteEmpleadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitaPendienteEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
