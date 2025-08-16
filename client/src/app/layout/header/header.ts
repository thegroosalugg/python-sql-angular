import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { Searchbar } from "app/shared/form/searchbar/searchbar";
import { Svg } from "app/shared/svg/svg";
import { UIService } from '../ui.service';

@Component({
     selector: 'app-header',
   standalone: true,
      imports: [Svg, Searchbar],
  templateUrl: './header.html',
    styleUrls: ['./header.scss'],
})
export class Header implements AfterViewInit {
  private uiService = inject(UIService);
  showHeader = this.uiService.showHeader;
  elementRef = viewChild<ElementRef>('header');

  ngAfterViewInit() {
    const element = this.elementRef()?.nativeElement;
    if (element) {
      this.uiService.setHeight(element.offsetHeight); // Set initial height

      const resizeObserver = new ResizeObserver(() => {
        this.uiService.setHeight(element.offsetHeight); // Watch for size changes
      });

      resizeObserver.observe(element);

      this.uiService.destroyRef.onDestroy(() => {
        resizeObserver.disconnect();
      });
    }
  }
}
