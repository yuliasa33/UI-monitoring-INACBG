import { TestBed } from '@angular/core/testing';

import { SetupitemService } from './setupitem.service';

describe('SetupitemService', () => {
  let service: SetupitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
