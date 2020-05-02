import { TestBed, async, inject } from '@angular/core/testing';

import { UserAsignedVisitGuard } from './user-asigned-visit.guard';

describe('UserAsignedVisitGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAsignedVisitGuard]
    });
  });

  it('should ...', inject([UserAsignedVisitGuard], (guard: UserAsignedVisitGuard) => {
    expect(guard).toBeTruthy();
  }));
});
