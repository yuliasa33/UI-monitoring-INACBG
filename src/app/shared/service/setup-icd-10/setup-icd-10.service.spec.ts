import { TestBed } from '@angular/core/testing';

import { SetupIcd10Service } from './setup-icd-10.service';

describe('SetupIcd10Service', () => {
  let service: SetupIcd10Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupIcd10Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
