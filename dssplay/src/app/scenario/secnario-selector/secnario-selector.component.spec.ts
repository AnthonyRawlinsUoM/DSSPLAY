import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecnarioSelectorComponent } from './secnario-selector.component';

describe('SecnarioSelectorComponent', () => {
  let component: SecnarioSelectorComponent;
  let fixture: ComponentFixture<SecnarioSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecnarioSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecnarioSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
