import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSpesialisasiDokterComponent } from './data-spesialisasi-dokter.component';

describe('DataSpesialisasiDokterComponent', () => {
  let component: DataSpesialisasiDokterComponent;
  let fixture: ComponentFixture<DataSpesialisasiDokterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSpesialisasiDokterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSpesialisasiDokterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
