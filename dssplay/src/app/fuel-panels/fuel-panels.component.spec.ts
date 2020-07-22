import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelPanelsComponent } from './fuel-panels.component';

describe('FuelPanelsComponent', () => {
  let component: FuelPanelsComponent;
  let fixture: ComponentFixture<FuelPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
