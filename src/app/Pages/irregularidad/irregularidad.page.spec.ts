import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IrregularidadPage } from './irregularidad.page';

describe('IrregularidadPage', () => {
  let component: IrregularidadPage;
  let fixture: ComponentFixture<IrregularidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrregularidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IrregularidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
