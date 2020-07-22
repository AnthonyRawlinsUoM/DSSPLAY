import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparatorChoicesComponent } from './comparator-choices.component';

describe('ComparatorChoicesComponent', () => {
  let component: ComparatorChoicesComponent;
  let fixture: ComponentFixture<ComparatorChoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparatorChoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparatorChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
