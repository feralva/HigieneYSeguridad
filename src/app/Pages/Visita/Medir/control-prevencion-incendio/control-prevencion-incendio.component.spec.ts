import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ControlPrevencionIncendioComponent } from './control-prevencion-incendio.component';

describe('ControlPrevencionIncendioComponent', () => {
  let component: ControlPrevencionIncendioComponent;
  let fixture: ComponentFixture<ControlPrevencionIncendioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPrevencionIncendioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ControlPrevencionIncendioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
