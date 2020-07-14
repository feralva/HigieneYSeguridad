import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaControlComponent } from './alta-control.component';

describe('AltaControlComponent', () => {
  let component: AltaControlComponent;
  let fixture: ComponentFixture<AltaControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaControlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
