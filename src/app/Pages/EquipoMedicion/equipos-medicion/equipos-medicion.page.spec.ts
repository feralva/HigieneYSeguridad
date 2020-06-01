import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquiposMedicionPage } from './equipos-medicion.page';

describe('EquiposMedicionPage', () => {
  let component: EquiposMedicionPage;
  let fixture: ComponentFixture<EquiposMedicionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquiposMedicionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquiposMedicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
