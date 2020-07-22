import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationLinkComponent } from './explanation-link.component';

describe('ExplanationLinkComponent', () => {
  let component: ExplanationLinkComponent;
  let fixture: ComponentFixture<ExplanationLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplanationLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplanationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
