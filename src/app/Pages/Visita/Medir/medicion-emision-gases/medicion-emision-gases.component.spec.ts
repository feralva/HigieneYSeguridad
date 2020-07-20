import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicionEmisionGasesComponent } from './medicion-emision-gases.component';

describe('MedicionEmisionGasesComponent', () => {
  let component: MedicionEmisionGasesComponent;
  let fixture: ComponentFixture<MedicionEmisionGasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicionEmisionGasesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicionEmisionGasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
