import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutiDokterComponent } from './cuti-dokter.component';

describe('CutiDokterComponent', () => {
  let component: CutiDokterComponent;
  let fixture: ComponentFixture<CutiDokterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutiDokterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CutiDokterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
