import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGlow]'
})
export class GlowDirective {

    // TODO this is a stub.
    // Eventually this will provide contextual help via a modal window.

    constructor(private el: ElementRef) {
       this.el = el;
    }

    @HostListener('mouseenter') onMouseEnter() {
      this.highlight('0px 0px 10px 5px #C4E4AE');
      this.raise(10);
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.highlight(null);
      this.raise(null);
    }

    private highlight(glow: string) {
      this.el.nativeElement.style['box-shadow'] = glow;
    }

    private raise(amount: number) {
      this.el.nativeElement.style['z-index'] = amount;
    }
}
