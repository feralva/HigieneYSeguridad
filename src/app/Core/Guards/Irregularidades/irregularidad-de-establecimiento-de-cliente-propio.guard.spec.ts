import { TestBed, async, inject } from '@angular/core/testing';

import { IrregularidadDeEstablecimientoDeClientePropioGuard } from './irregularidad-de-establecimiento-de-cliente-propio.guard';

describe('IrregularidadDeEstablecimientoDeClientePropioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IrregularidadDeEstablecimientoDeClientePropioGuard]
    });
  });

  it('should ...', inject([IrregularidadDeEstablecimientoDeClientePropioGuard], (guard: IrregularidadDeEstablecimientoDeClientePropioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
