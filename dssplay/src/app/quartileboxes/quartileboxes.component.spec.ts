import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartileboxesComponent } from './quartileboxes.component';

describe('QuartileboxesComponent', () => {
  let component: QuartileboxesComponent;
  let fixture: ComponentFixture<QuartileboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuartileboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartileboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
