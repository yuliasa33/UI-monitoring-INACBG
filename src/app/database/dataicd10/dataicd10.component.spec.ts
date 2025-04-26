import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dataicd10Component } from './dataicd10.component';

describe('Dataicd10Component', () => {
  let component: Dataicd10Component;
  let fixture: ComponentFixture<Dataicd10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ Dataicd10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dataicd10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
