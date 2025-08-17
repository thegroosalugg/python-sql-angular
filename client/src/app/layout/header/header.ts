import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { UIService } from '../ui.service';
import { Searchbar } from "app/shared/form/searchbar/searchbar";
import { Svg } from "app/shared/ui/svg/svg";
import { Logo } from "app/shared/ui/logo/logo";
import { appMetadata } from 'app/app.meta';

@Component({
     selector: 'app-header',
   standalone: true,
      imports: [Svg, Searchbar, Logo],
  templateUrl: './header.html',
    styleUrls: ['./header.scss'],
})
export class Header implements AfterViewInit {
  title = appMetadata.title
  private elementRef = viewChild<ElementRef>('header');
  private uiService  = inject(UIService);
  showHeader = this.uiService.showHeader;
  openLeftSidebar  = () => this.uiService.openSidebar('left');
  openRightSidebar = () => this.uiService.openSidebar('right');

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
