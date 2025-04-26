import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTindakanComponent } from './data-tindakan.component';

describe('DataTindakanComponent', () => {
  let component: DataTindakanComponent;
  let fixture: ComponentFixture<DataTindakanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DataTindakanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTindakanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
