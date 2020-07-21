import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XAxisChooserComponent } from './x-axis-chooser.component';

describe('XAxisChooserComponent', () => {
  let component: XAxisChooserComponent;
  let fixture: ComponentFixture<XAxisChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XAxisChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XAxisChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
