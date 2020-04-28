import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuServiceService = TestBed.get(MenuServiceService);
    expect(service).toBeTruthy();
  });
});
