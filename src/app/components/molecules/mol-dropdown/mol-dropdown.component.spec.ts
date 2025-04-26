import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolDropdownComponent } from './mol-dropdown.component';

describe('MolDropdownComponent', () => {
  let component: MolDropdownComponent;
  let fixture: ComponentFixture<MolDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MolDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MolDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
