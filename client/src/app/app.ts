import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Footer } from "./layout/footer/footer";
import { UIService } from './layout/ui.service';
import { Sidebar } from "./layout/sidebar/sidebar";
import { Searchbar } from "./shared/form/searchbar/searchbar";
import { Users } from "./users/users";

@Component({
     selector: 'app-root',
      imports: [RouterOutlet, Header, Footer, Sidebar, Searchbar, Users],
  templateUrl: './app.html',
     styleUrl: './app.scss'
})
export class App {
  private uiService = inject(UIService);
  height = this.uiService.height;
}
