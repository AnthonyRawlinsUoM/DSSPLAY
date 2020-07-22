import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceflowComponent } from './choiceflow.component';

describe('ChoiceflowComponent', () => {
  let component: ChoiceflowComponent;
  let fixture: ComponentFixture<ChoiceflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
