import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerQrUbicacionModalComponent } from './ver-qr-ubicacion-modal.component';

describe('VerQrUbicacionModalComponent', () => {
  let component: VerQrUbicacionModalComponent;
  let fixture: ComponentFixture<VerQrUbicacionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerQrUbicacionModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerQrUbicacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
