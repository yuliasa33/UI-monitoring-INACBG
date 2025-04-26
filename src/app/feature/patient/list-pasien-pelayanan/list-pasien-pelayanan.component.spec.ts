import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPasienPelayananComponent } from './list-pasien-pelayanan.component';

describe('ListPasienPelayananComponent', () => {
  let component: ListPasienPelayananComponent;
  let fixture: ComponentFixture<ListPasienPelayananComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListPasienPelayananComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPasienPelayananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
