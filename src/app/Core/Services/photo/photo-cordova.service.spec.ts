import { TestBed } from '@angular/core/testing';

import { PhotoCordovaService } from './photo-cordova.service';

describe('PhotoCordovaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoCordovaService = TestBed.get(PhotoCordovaService);
    expect(service).toBeTruthy();
  });
});
