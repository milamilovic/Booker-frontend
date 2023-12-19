import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../user/user.service";
import {catchError, map, of} from "rxjs";

@Component({
  selector: 'app-activation-view',
  templateUrl: './activation-view.component.html',
  styleUrls: ['./activation-view.component.css']
})
export class ActivationViewComponent {
  activationLink: string = "";
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.activationLink = this.route.snapshot.paramMap.get('activationLink')!;
    this.userService.activateProfile(this.activationLink).subscribe(
      (response) => {
        setTimeout(() => {
          // Navigate to the desired route after 5 seconds
          this.router.navigate(['/home']); // Replace '/destination' with your actual destination route
        }, 200000);


      },
      (error) => {
        console.error("Error activating: ", error);

      }
    )

  }
}
