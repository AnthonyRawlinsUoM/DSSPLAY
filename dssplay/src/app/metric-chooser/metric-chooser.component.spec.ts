import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricChooserComponent } from './metric-chooser.component';

describe('MetricChooserComponent', () => {
  let component: MetricChooserComponent;
  let fixture: ComponentFixture<MetricChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
