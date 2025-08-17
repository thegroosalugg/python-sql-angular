import { Component, signal } from '@angular/core';
import { appMetadata } from 'app/app.meta';
import { Logo } from "app/shared/ui/logo/logo";

const { title, rights, stack, link } = appMetadata;

@Component({
     selector: 'app-footer',
      imports: [Logo],
  templateUrl: './footer.html',
     styleUrl: './footer.scss'
})
export class Footer {
   title = title;
  rights = rights;
   stack = stack;
    link = link;
}
