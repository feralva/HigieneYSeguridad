import { TestBed, async, inject } from '@angular/core/testing';

import { MiembroEmpresaGuard } from './miembro-empresa.guard';

describe('MiembroEmpresaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiembroEmpresaGuard]
    });
  });

  it('should ...', inject([MiembroEmpresaGuard], (guard: MiembroEmpresaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
