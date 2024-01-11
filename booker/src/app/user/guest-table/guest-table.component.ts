import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Guest} from "../guest-view/model/guest.model";

@Component({
  selector: 'app-guest-table',
  templateUrl: './guest-table.component.html',
  styleUrls: ['./guest-table.component.css']
})
export class GuestTableComponent implements OnInit{
  guests!: Guest[];

  constructor(private service: UserService) {
  }

  ngOnInit() {
    const ownerId = Number(localStorage.getItem('loggedId'));
    this.service.getGuestsForOwner(ownerId).subscribe({
      next: (result: Guest[]) => {
        this.guests = result;
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }
}
