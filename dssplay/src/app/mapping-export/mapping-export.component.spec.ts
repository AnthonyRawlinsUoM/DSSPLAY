import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingExportComponent } from './mapping-export.component';

describe('MappingExportComponent', () => {
  let component: MappingExportComponent;
  let fixture: ComponentFixture<MappingExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
