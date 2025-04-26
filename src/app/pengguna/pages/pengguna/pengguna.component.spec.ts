import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenggunaComponent } from './pengguna.component';

describe('PenggunaComponent', () => {
  let component: PenggunaComponent;
  let fixture: ComponentFixture<PenggunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PenggunaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenggunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
