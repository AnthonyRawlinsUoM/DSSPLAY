import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricSpecificsComponent } from './metric-specifics.component';

describe('MetricSpecificsComponent', () => {
  let component: MetricSpecificsComponent;
  let fixture: ComponentFixture<MetricSpecificsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricSpecificsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricSpecificsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
