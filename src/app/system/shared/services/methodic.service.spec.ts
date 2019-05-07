import { TestBed, inject } from '@angular/core/testing';

import { MethodicService } from './methodic.service';

describe('MethodicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MethodicService]
    });
  });

  it('should be created', inject([MethodicService], (service: MethodicService) => {
    expect(service).toBeTruthy();
  }));
});
