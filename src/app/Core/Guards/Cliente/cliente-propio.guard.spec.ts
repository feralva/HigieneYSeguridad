import { TestBed, async, inject } from '@angular/core/testing';

import { ClientePropioGuard } from './cliente-propio.guard';

describe('ClientePropioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientePropioGuard]
    });
  });

  it('should ...', inject([ClientePropioGuard], (guard: ClientePropioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
