import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YAxisChooserComponent } from './y-axis-chooser.component';

describe('YAxisChooserComponent', () => {
  let component: YAxisChooserComponent;
  let fixture: ComponentFixture<YAxisChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YAxisChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YAxisChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
