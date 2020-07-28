import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextualComponent } from './contextual.component';

describe('ContextualComponent', () => {
  let component: ContextualComponent;
  let fixture: ComponentFixture<ContextualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
