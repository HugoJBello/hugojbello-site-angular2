import { TestBed, inject } from '@angular/core/testing';

import { ColorUtilsService } from './color-utils.service';

describe('ColorUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorUtilsService]
    });
  });

  it('should be created', inject([ColorUtilsService], (service: ColorUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
