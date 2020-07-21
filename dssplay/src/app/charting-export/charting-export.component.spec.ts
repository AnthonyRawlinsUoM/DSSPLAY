import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartingExportComponent } from './charting-export.component';

describe('ChartingExportComponent', () => {
  let component: ChartingExportComponent;
  let fixture: ComponentFixture<ChartingExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartingExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartingExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
