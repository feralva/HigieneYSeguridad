import { TestBed } from '@angular/core/testing';

import { EquipoMedicionService } from './equipo-medicion.service';

describe('EquipoMedicionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipoMedicionService = TestBed.get(EquipoMedicionService);
    expect(service).toBeTruthy();
  });
});
