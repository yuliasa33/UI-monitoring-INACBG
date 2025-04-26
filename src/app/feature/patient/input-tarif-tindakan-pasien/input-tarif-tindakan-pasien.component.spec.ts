import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTarifTindakanPasienComponent } from './input-tarif-tindakan-pasien.component';

describe('InputTarifTindakanPasienComponent', () => {
  let component: InputTarifTindakanPasienComponent;
  let fixture: ComponentFixture<InputTarifTindakanPasienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTarifTindakanPasienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputTarifTindakanPasienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
