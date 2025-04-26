import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomInputFieldsComponent } from './atom-input-fields.component';

describe('AtomInputFieldsComponent', () => {
  let component: AtomInputFieldsComponent;
  let fixture: ComponentFixture<AtomInputFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtomInputFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtomInputFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
