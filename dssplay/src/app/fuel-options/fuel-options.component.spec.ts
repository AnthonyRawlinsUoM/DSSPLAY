import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelOptionsComponent } from './fuel-options.component';

describe('FuelOptionsComponent', () => {
  let component: FuelOptionsComponent;
  let fixture: ComponentFixture<FuelOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
