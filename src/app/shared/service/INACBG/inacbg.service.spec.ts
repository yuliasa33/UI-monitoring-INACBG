import { TestBed } from '@angular/core/testing';

import { InacbgService } from './inacbg.service';

describe('InacbgService', () => {
  let service: InacbgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InacbgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
