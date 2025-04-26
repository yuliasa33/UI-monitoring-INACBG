import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalDokterComponent } from './jadwal-dokter.component';

describe('JadwalDokterComponent', () => {
  let component: JadwalDokterComponent;
  let fixture: ComponentFixture<JadwalDokterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JadwalDokterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JadwalDokterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
