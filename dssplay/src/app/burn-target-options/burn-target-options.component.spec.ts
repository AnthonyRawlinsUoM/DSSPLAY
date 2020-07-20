import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurnTargetOptionsComponent } from './burn-target-options.component';

describe('BurnTargetOptionsComponent', () => {
  let component: BurnTargetOptionsComponent;
  let fixture: ComponentFixture<BurnTargetOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurnTargetOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurnTargetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
