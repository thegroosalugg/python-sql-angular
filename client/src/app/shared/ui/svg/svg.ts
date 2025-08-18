import { Component, computed, input } from '@angular/core';
import { Icon } from './svg.types';

@Component({
     selector: 'app-svg',
      imports: [],
  templateUrl: './svg.html',
     styleUrl: './svg.scss',
})
export class Svg {
  icon = input.required<Icon>();
  href = computed(() => `/icons.svg#icon-${this.icon()}`);
}
