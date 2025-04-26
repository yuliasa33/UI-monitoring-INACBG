import { TestBed } from '@angular/core/testing';

import { SetupCutiDokterService } from './setup-cuti-dokter.service';

describe('SetupCutiDokterService', () => {
  let service: SetupCutiDokterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupCutiDokterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
