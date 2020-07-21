import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherOptionsComponent } from './weather-options.component';

describe('WeatherOptionsComponent', () => {
  let component: WeatherOptionsComponent;
  let fixture: ComponentFixture<WeatherOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
