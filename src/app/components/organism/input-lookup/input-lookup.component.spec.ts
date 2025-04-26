import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLookupComponent } from './input-lookup.component';

describe('InputLookupComponent', () => {
  let component: InputLookupComponent;
  let fixture: ComponentFixture<InputLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InputLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
