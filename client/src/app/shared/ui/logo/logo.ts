import { Component, input } from '@angular/core';
import { appMetadata } from 'app/app.meta';
import { Svg } from "app/shared/ui/svg/svg";

@Component({
     selector: 'app-logo',
      imports: [Svg],
  templateUrl: './logo.html',
     styleUrl: './logo.scss'
})
export class Logo {
  title = appMetadata.title
  responsive = input(false);
}
