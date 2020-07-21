import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchmentOptionsComponent } from './catchment-options.component';

describe('CatchmentOptionsComponent', () => {
  let component: CatchmentOptionsComponent;
  let fixture: ComponentFixture<CatchmentOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchmentOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchmentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
