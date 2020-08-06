import { TestBed } from '@angular/core/testing';

import { IrregularidadService } from './irregularidad.service';

describe('IrregularidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IrregularidadService = TestBed.get(IrregularidadService);
    expect(service).toBeTruthy();
  });
});
