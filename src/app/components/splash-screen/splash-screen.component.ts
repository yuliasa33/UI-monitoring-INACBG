import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent implements OnDestroy {

  constructor(private renderer:Renderer2,
              private el:ElementRef
  ){

  }

  ngOnDestroy() {
    const nativeEl = this.el.nativeElement;
    this.renderer.addClass(nativeEl, 'fade-out');

    // Delay actual DOM removal to allow fade-out
    setTimeout(() => {
      // Angular will destroy component automatically after this
    }, 500); // match your CSS transition time
  }

}
