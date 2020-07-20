import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpatialMetricsComponent } from './spatial-metrics.component';

describe('SpatialMetricsComponent', () => {
  let component: SpatialMetricsComponent;
  let fixture: ComponentFixture<SpatialMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpatialMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
