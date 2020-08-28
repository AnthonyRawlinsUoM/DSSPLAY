import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularReportComponent } from './modular-report.component';

describe('ModularReportComponent', () => {
  let component: ModularReportComponent;
  let fixture: ComponentFixture<ModularReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModularReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModularReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
