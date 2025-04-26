import { TestBed } from '@angular/core/testing';

import { SetupWargaNegaraService } from './setup-warga-negara.service';

describe('SetupWargaNegaraService', () => {
  let service: SetupWargaNegaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupWargaNegaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
