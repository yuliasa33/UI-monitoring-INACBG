import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnRoutedPagesComponent } from './un-routed-pages.component';

describe('UnRoutedPagesComponent', () => {
  let component: UnRoutedPagesComponent;
  let fixture: ComponentFixture<UnRoutedPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UnRoutedPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnRoutedPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
