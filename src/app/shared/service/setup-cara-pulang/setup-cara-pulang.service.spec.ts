import { TestBed } from '@angular/core/testing';

import { SetupCaraPulangService } from './setup-cara-pulang.service';

describe('SetupCaraPulangService', () => {
  let service: SetupCaraPulangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupCaraPulangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
