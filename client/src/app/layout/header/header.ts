import { Component } from '@angular/core';
import { Svg } from "app/shared/svg/svg";
import { Searchbar } from "app/shared/form/searchbar/searchbar";

@Component({
     selector: 'app-header',
      imports: [Svg, Searchbar],
  templateUrl: './header.html',
     styleUrl: './header.scss'
})
export class Header {

}
