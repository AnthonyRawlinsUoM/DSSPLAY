import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelResizeHandleComponent } from './panel-resize-handle.component';

describe('PanelResizeHandleComponent', () => {
  let component: PanelResizeHandleComponent;
  let fixture: ComponentFixture<PanelResizeHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelResizeHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelResizeHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
