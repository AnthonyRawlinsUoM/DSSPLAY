import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrappeatorProjectComponent } from './frappeator-project.component';

describe('FrappeatorProjectComponent', () => {
  let component: FrappeatorProjectComponent;
  let fixture: ComponentFixture<FrappeatorProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrappeatorProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrappeatorProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
