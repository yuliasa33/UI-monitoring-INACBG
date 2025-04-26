import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisiPasienComponent } from './admisi-pasien.component';

describe('AdmisiPasienComponent', () => {
  let component: AdmisiPasienComponent;
  let fixture: ComponentFixture<AdmisiPasienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdmisiPasienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmisiPasienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
