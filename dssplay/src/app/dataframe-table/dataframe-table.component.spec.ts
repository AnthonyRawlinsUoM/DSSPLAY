import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataframeTableComponent } from './dataframe-table.component';

describe('DataframeTableComponent', () => {
  let component: DataframeTableComponent;
  let fixture: ComponentFixture<DataframeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataframeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataframeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
