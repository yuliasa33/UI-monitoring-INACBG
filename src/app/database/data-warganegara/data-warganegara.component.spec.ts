import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWarganegaraComponent } from './data-warganegara.component';

describe('DataWarganegaraComponent', () => {
  let component: DataWarganegaraComponent;
  let fixture: ComponentFixture<DataWarganegaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DataWarganegaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataWarganegaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
