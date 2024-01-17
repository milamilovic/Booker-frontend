import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user/user.service";
import {User} from "../../user/model/user.model";
import {UserType} from "../../enums/user-type.enum";
import {NavbarService} from "../navbar.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent{
  isMenuOpen: boolean = false;
  loginUserId: number = Number(localStorage.getItem("loggedId"));
  // @ts-ignore
    loginRole: string = localStorage.getItem("loggedRole");
  loggedInUser: User | undefined;

  constructor(private userService: UserService,
              private navbar: NavbarService) {
    this.navbar.myEvent.subscribe(() => {
      this.handleEvent();
    });
  }

  setRouterLink() {
    this.userService.findById(this.loginUserId).subscribe(
      (user: User) => {
        this.loggedInUser = user;

        if (this.loggedInUser && this.loggedInUser.role) {
          if (this.loggedInUser.role === UserType.GUEST) {
            this.loginRole = 'guests';
          } else if (this.loggedInUser.role === UserType.OWNER) {
            this.loginRole = 'owners';
          } else if (this.loggedInUser.role === UserType.ADMIN) {
            this.loginRole = 'admins';
          }
        }
      },
      (error: any) => {
        console.error('Error fetching user:', error);
      }
    );
  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.toggleMenu();
    this.userService.logout();
    this.handleEvent();
  }

  handleEvent() {
    this.loginUserId = Number(localStorage.getItem("loggedId"));
    // @ts-ignore
    this.loginRole = localStorage.getItem("loggedRole");
  }
}
