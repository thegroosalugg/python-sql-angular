import { Component, signal } from '@angular/core';

@Component({
     selector: 'app-footer',
      imports: [],
  templateUrl: './footer.component.html',
     styleUrl: './footer.component.scss'
})
export class FooterComponent {
    appName = signal('My App');
    appLogo = signal('Logo');
  appRights = signal('2025 My App');
   appStack = signal('Designed with Angular 20');
     github = signal('https://github.com/');
}
