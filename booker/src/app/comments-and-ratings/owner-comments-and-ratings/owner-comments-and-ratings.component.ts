import {Component, OnInit} from '@angular/core';
import {Owner} from "../../user/owner-view/model/owner.model";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-owner-comments-and-ratings',
  templateUrl: './owner-comments-and-ratings.component.html',
  styleUrls: ['./owner-comments-and-ratings.component.css']
})
export class OwnerCommentsAndRatingsComponent implements OnInit{
  owners : Owner[] = [];

  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
    this.userService.getOwners().subscribe({
      next: (data: Owner[]) => {
        this.owners = data;
      },
      error: (_) => {
        console.log("Error with owners!")
      }
    })
  }

}
