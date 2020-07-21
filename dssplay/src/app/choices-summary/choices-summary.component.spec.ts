import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesSummaryComponent } from './choices-summary.component';

describe('ChoicesSummaryComponent', () => {
  let component: ChoicesSummaryComponent;
  let fixture: ComponentFixture<ChoicesSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
