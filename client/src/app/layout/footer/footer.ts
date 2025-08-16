import { Component, signal } from '@angular/core';

@Component({
     selector: 'app-footer',
      imports: [],
  templateUrl: './footer.html',
     styleUrl: './footer.scss'
})
export class Footer {
    appName = signal('My App');
    appLogo = signal('Logo');
  appRights = signal('2025 My App');
   appStack = signal('Designed with Angular 20');
     github = signal('https://github.com/');
}
