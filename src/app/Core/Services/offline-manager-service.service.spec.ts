import { TestBed } from '@angular/core/testing';

import { OfflineManagerServiceService } from './offline-manager-service.service';

describe('OfflineManagerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflineManagerServiceService = TestBed.get(OfflineManagerServiceService);
    expect(service).toBeTruthy();
  });
});
