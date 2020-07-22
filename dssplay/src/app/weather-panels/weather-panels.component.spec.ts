import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPanelsComponent } from './weather-panels.component';

describe('WeatherPanelsComponent', () => {
  let component: WeatherPanelsComponent;
  let fixture: ComponentFixture<WeatherPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
