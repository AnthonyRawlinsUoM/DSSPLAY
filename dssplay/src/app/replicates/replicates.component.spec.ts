import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplicatesComponent } from './replicates.component';

describe('ReplicatesComponent', () => {
  let component: ReplicatesComponent;
  let fixture: ComponentFixture<ReplicatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplicatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplicatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
