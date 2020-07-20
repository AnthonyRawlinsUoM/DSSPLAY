import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrappeatorProjectsComponent } from './frappeator-projects.component';

describe('FrappeatorProjectsComponent', () => {
  let component: FrappeatorProjectsComponent;
  let fixture: ComponentFixture<FrappeatorProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrappeatorProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrappeatorProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
