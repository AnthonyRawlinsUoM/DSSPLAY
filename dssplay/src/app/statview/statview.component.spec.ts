import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatviewComponent } from './statview.component';

describe('StatviewComponent', () => {
  let component: StatviewComponent;
  let fixture: ComponentFixture<StatviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
