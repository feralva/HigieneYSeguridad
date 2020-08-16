import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StripeComponent } from './stripe.component';

describe('StripeComponent', () => {
  let component: StripeComponent;
  let fixture: ComponentFixture<StripeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
