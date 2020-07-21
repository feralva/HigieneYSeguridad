import { TestBed } from '@angular/core/testing';

import { UbicacionAutoCompleteService } from './ubicacion-auto-complete.service';

describe('UbicacionAutoCompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UbicacionAutoCompleteService = TestBed.get(UbicacionAutoCompleteService);
    expect(service).toBeTruthy();
  });
});
