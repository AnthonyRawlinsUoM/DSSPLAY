import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleChooserComponent } from './user-role-chooser.component';

describe('UserRoleChooserComponent', () => {
  let component: UserRoleChooserComponent;
  let fixture: ComponentFixture<UserRoleChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
