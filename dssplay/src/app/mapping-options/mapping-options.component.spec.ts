import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingOptionsComponent } from './mapping-options.component';

describe('MappingOptionsComponent', () => {
  let component: MappingOptionsComponent;
  let fixture: ComponentFixture<MappingOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
