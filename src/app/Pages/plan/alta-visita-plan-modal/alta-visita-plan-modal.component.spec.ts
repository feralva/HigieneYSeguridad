import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaVisitaPlanModalComponent } from './alta-visita-plan-modal.component';

describe('AltaVisitaPlanModalComponent', () => {
  let component: AltaVisitaPlanModalComponent;
  let fixture: ComponentFixture<AltaVisitaPlanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaVisitaPlanModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaVisitaPlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
