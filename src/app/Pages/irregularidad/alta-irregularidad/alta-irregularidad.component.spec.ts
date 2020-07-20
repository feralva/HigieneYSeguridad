import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaIrregularidadComponent } from './alta-irregularidad.component';

describe('AltaIrregularidadComponent', () => {
  let component: AltaIrregularidadComponent;
  let fixture: ComponentFixture<AltaIrregularidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaIrregularidadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaIrregularidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
