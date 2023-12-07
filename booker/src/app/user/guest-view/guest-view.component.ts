import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {Guest} from "./model/guest.model";

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})
export class GuestViewComponent implements OnInit{
  hide_new: boolean = true;
  hide_confirm : boolean = true;
  guest!: Guest;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getGuestById(1).subscribe({
      next: (result: Guest) => {
        this.guest = result;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }



}
