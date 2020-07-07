import { TestBed } from '@angular/core/testing';

import { HashingService } from './hashing.service';

describe('HashingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HashingService = TestBed.get(HashingService);
    expect(service).toBeTruthy();
  });
});
