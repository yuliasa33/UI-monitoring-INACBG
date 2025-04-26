import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPoliComponent } from './data-poli.component';

describe('DataPoliComponent', () => {
  let component: DataPoliComponent;
  let fixture: ComponentFixture<DataPoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DataPoliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
