import { TestBed, async, inject } from '@angular/core/testing';

import { IrregularidadesDeEstablecimientoDeClientePropioGuard } from './irregularidades-de-establecimiento-de-cliente-propio.guard';

describe('IrregularidadesDeEstablecimientoDeClientePropioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IrregularidadesDeEstablecimientoDeClientePropioGuard]
    });
  });

  it('should ...', inject([IrregularidadesDeEstablecimientoDeClientePropioGuard], (guard: IrregularidadesDeEstablecimientoDeClientePropioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
