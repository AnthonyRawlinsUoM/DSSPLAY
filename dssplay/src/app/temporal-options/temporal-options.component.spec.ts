import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalOptionsComponent } from './temporal-options.component';

describe('TemporalOptionsComponent', () => {
  let component: TemporalOptionsComponent;
  let fixture: ComponentFixture<TemporalOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
