import { TestBed, async, inject } from '@angular/core/testing';

import { PlanDeClientePropioGuard } from './plan-de-cliente-propio.guard';

describe('PlanDeClientePropioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanDeClientePropioGuard]
    });
  });

  it('should ...', inject([PlanDeClientePropioGuard], (guard: PlanDeClientePropioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
