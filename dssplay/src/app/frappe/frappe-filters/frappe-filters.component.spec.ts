import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrappeFiltersComponent } from './frappe-filters.component';

describe('FrappeFiltersComponent', () => {
  let component: FrappeFiltersComponent;
  let fixture: ComponentFixture<FrappeFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrappeFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrappeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
