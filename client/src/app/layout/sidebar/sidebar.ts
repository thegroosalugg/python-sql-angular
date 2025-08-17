import { Component, computed, inject, input } from '@angular/core';
import { Svg } from "app/shared/ui/svg/svg";
import { UIService } from '../ui.service';

@Component({
     selector: 'app-sidebar',
      imports: [Svg],
  templateUrl: './sidebar.html',
     styleUrl: './sidebar.scss'
})
export class Sidebar {
  private uiService = inject(UIService);
  id = input.required();
  onRight = input(false);

  isOpen = computed(() => this.uiService.showSidebar() === this.id());
  close = () => this.uiService.closeSidebar();
}
