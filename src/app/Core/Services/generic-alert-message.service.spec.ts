import { TestBed } from '@angular/core/testing';

import { GenericAlertMessageService } from './generic-alert-message.service';

describe('GenericAlertMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericAlertMessageService = TestBed.get(GenericAlertMessageService);
    expect(service).toBeTruthy();
  });
});
