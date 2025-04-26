import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolTableComponent } from './mol-table.component';

describe('MolTableComponent', () => {
  let component: MolTableComponent;
  let fixture: ComponentFixture<MolTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MolTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MolTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
