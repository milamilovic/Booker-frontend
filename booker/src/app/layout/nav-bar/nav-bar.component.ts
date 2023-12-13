import {Component} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isMenuOpen: boolean = false;
  loginUserId: number = 1;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
