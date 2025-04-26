import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalDokterDayComponent } from './jadwal-dokter-day.component';

describe('JadwalDokterDayComponent', () => {
  let component: JadwalDokterDayComponent;
  let fixture: ComponentFixture<JadwalDokterDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JadwalDokterDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JadwalDokterDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
