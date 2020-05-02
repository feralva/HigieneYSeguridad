import { TestBed, async, inject } from '@angular/core/testing';

import { UserRoleAllowsViewGuard } from './user-role-allows-view.guard';

describe('UserRoleAllowsViewGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRoleAllowsViewGuard]
    });
  });

  it('should ...', inject([UserRoleAllowsViewGuard], (guard: UserRoleAllowsViewGuard) => {
    expect(guard).toBeTruthy();
  }));
});
