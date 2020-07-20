import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpatialExportComponent } from './spatial-export.component';

describe('SpatialExportComponent', () => {
  let component: SpatialExportComponent;
  let fixture: ComponentFixture<SpatialExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpatialExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
