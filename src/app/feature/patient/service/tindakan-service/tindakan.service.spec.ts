import { TestBed } from '@angular/core/testing';

import { TindakanService } from './tindakan.service';

describe('TindakanService', () => {
  let service: TindakanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TindakanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
