import {Component, OnInit} from '@angular/core';
import {Owner} from "../owner-view/model/owner.model";
import {UserService} from "../user.service";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit{
  owner! : Owner;
  accommodationId : number = 0;
  ownerId : number = 0;

  constructor(private AccommodationService: AccommodationService,
              private service : UserService) { }
  ngOnInit(): void {
    this.accommodationId = Number(localStorage.getItem("accommodationId"));
    this.AccommodationService.getAccommodation(this.accommodationId).subscribe({
      next: (result: AccommodationViewDto) => {
        this.ownerId = result.owner_id;
        console.log(this.ownerId);
        console.log(result);
        this.service.getOwnerById(this.ownerId).subscribe({
          next: (result: Owner) =>{
            this.owner = result;
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  report():void{

  }

}
