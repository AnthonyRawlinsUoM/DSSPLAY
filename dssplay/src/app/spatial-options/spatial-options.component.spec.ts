import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpatialOptionsComponent } from './spatial-options.component';

describe('SpatialOptionsComponent', () => {
  let component: SpatialOptionsComponent;
  let fixture: ComponentFixture<SpatialOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpatialOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
