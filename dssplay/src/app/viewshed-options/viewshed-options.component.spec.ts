import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewshedOptionsComponent } from './viewshed-options.component';

describe('ViewshedOptionsComponent', () => {
  let component: ViewshedOptionsComponent;
  let fixture: ComponentFixture<ViewshedOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewshedOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewshedOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
