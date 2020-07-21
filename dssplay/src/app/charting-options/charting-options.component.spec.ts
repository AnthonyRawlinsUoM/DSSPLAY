import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartingOptionsComponent } from './charting-options.component';

describe('ChartingOptionsComponent', () => {
  let component: ChartingOptionsComponent;
  let fixture: ComponentFixture<ChartingOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartingOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
