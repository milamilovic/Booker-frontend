import {Component} from '@angular/core';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isMenuOpen: boolean = false;
  loginUserId: number = 1;

  constructor(private userService: UserService) {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.userService.logout();
    this.toggleMenu();
  }
}
