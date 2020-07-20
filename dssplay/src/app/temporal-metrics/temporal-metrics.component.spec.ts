import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalMetricsComponent } from './temporal-metrics.component';

describe('TemporalMetricsComponent', () => {
  let component: TemporalMetricsComponent;
  let fixture: ComponentFixture<TemporalMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
