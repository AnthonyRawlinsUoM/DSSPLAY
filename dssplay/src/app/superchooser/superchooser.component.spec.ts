import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperchooserComponent } from './superchooser.component';

describe('SuperchooserComponent', () => {
  let component: SuperchooserComponent;
  let fixture: ComponentFixture<SuperchooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperchooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperchooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
