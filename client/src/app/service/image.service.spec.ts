import { TestBed } from '@angular/core/testing';

import { ImageServiceService } from './image.service';

describe('ImageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageServiceService = TestBed.get(ImageServiceService);
    expect(service).toBeTruthy();
  });
});
