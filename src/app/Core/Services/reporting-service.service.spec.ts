import { TestBed } from '@angular/core/testing';

import { ReportingServiceService } from './reporting-service.service';

describe('ReportingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportingServiceService = TestBed.get(ReportingServiceService);
    expect(service).toBeTruthy();
  });
});
