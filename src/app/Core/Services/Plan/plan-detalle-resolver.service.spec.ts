import { TestBed } from '@angular/core/testing';

import { PlanDetalleResolverService } from './plan-detalle-resolver.service';

describe('PlanDetalleResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanDetalleResolverService = TestBed.get(PlanDetalleResolverService);
    expect(service).toBeTruthy();
  });
});
