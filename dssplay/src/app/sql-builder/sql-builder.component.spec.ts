import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlBuilderComponent } from './sql-builder.component';

describe('SqlBuilderComponent', () => {
  let component: SqlBuilderComponent;
  let fixture: ComponentFixture<SqlBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
