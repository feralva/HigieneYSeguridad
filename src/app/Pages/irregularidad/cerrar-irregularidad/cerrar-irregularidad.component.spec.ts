import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CerrarIrregularidadComponent } from './cerrar-irregularidad.component';

describe('CerrarIrregularidadComponent', () => {
  let component: CerrarIrregularidadComponent;
  let fixture: ComponentFixture<CerrarIrregularidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerrarIrregularidadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CerrarIrregularidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
