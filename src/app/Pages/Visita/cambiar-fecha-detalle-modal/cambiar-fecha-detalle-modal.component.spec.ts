import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambiarFechaDetalleModalComponent } from './cambiar-fecha-detalle-modal.component';

describe('CambiarFechaDetalleModalComponent', () => {
  let component: CambiarFechaDetalleModalComponent;
  let fixture: ComponentFixture<CambiarFechaDetalleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarFechaDetalleModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarFechaDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
