import { TestBed } from '@angular/core/testing';

import { SetupPoliService } from './setup-poli.service';

describe('SetupPoliService', () => {
  let service: SetupPoliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupPoliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
