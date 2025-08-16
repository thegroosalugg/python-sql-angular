import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Footer } from "./layout/footer/footer";
import { UIService } from './layout/ui.service';

@Component({
     selector: 'app-root',
      imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
     styleUrl: './app.scss'
})
export class App {
  private uiService = inject(UIService);
  height = this.uiService.height;
}
