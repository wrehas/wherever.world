import { TestBed, inject } from '@angular/core/testing';

import { KittyService } from './kitty.service';

describe('KittyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KittyService]
    });
  });

  it('should ...', inject([KittyService], (service: KittyService) => {
    expect(service).toBeTruthy();
  }));
});
