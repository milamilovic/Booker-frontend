import {Component, OnInit} from '@angular/core';
import {Admin} from "./model/admin.model";
import {UserService} from "../user.service";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit{
  hide_new: boolean = true;
  hide_confirm : boolean = true;
  admin!: Admin;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getAdmin(5).subscribe({
      next: (result: Admin) => {
        this.admin = result;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
