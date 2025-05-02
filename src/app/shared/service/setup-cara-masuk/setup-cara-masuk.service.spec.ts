import { TestBed } from '@angular/core/testing';

import { SetupCaraMasukService } from './setup-cara-masuk.service';

describe('SetupCaraMasukService', () => {
  let service: SetupCaraMasukService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupCaraMasukService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
