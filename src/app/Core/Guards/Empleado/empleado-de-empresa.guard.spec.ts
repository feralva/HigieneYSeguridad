import { TestBed, async, inject } from '@angular/core/testing';

import { EmpleadoDeEmpresaGuard } from './empleado-de-empresa.guard';

describe('EmpleadoDeEmpresaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadoDeEmpresaGuard]
    });
  });

  it('should ...', inject([EmpleadoDeEmpresaGuard], (guard: EmpleadoDeEmpresaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
