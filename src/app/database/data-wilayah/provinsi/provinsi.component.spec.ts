import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinsiComponent } from './provinsi.component';

describe('ProvinsiComponent', () => {
  let component: ProvinsiComponent;
  let fixture: ComponentFixture<ProvinsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvinsiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProvinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
