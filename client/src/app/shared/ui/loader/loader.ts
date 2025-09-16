import { Component, input } from '@angular/core';

@Component({
     selector: 'app-loader',
      imports: [],
  templateUrl: './loader.html',
     styleUrl: './loader.scss'
})
export class Loader {
  size  = input<'xs' |   'sm'  | ''>('');
  color = input<'bg' | 'white' | ''>('');
}
