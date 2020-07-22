import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appExplain]'
})
export class ExplainDirective {

  // TODO this is a stub.
  // Eventually this will provide contextual help via a modal window.

  constructor(private el: ElementRef) {
     this.el = el;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }

}
