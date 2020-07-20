import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalExportComponent } from './temporal-export.component';

describe('TemporalExportComponent', () => {
  let component: TemporalExportComponent;
  let fixture: ComponentFixture<TemporalExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
