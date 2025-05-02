import { TestBed } from '@angular/core/testing';

import { SetupJenisRawatService } from './setup-jenis-rawat.service';

describe('SetupJenisRawatService', () => {
  let service: SetupJenisRawatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupJenisRawatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
