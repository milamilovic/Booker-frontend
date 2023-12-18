import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-activation-view',
  templateUrl: './activation-view.component.html',
  styleUrls: ['./activation-view.component.css']
})
export class ActivationViewComponent {
  activationLink: string = "";
  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.activationLink = this.route.snapshot.paramMap.get('activationLink')!;
    this.userService.activateProfile(this.activationLink);
  }
}
