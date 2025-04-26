import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolDialogComponent } from './mol-dialog.component';

describe('MolDialogComponent', () => {
  let component: MolDialogComponent;
  let fixture: ComponentFixture<MolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MolDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
