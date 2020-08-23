import { TestBed, async, inject } from '@angular/core/testing';

import { EstablecimientoDeClientePropioGuard } from './establecimiento-de-cliente-propio.guard';

describe('EstablecimientoDeClientePropioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstablecimientoDeClientePropioGuard]
    });
  });

  it('should ...', inject([EstablecimientoDeClientePropioGuard], (guard: EstablecimientoDeClientePropioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
