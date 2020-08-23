import { TestBed, async, inject } from '@angular/core/testing';

import { VisitaDeClientePropioGuard } from './visita-de-cliente-propio.guard';

describe('VisitaDeClientePropioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitaDeClientePropioGuard]
    });
  });

  it('should ...', inject([VisitaDeClientePropioGuard], (guard: VisitaDeClientePropioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
