import {Component, Input} from '@angular/core';
import {ReservationRequest} from "../../accommodation/accommodation/model/ReservationRequest";
import {RequestService} from "../request.service";
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrls: ['./guest-card.component.css']
})
export class GuestCardComponent {
  @Input()
  request: ReservationRequest;

  accommodation: AccommodationViewDto;

  status: String = '';

  constructor(private service: RequestService) {
    this.request = {
      "guestId": NaN,
      "accommodationId": 0,
      "id": 0,
      "fromDate": "2024-03-01",
      "toDate": "2024-03-10",
      "numberOfGuests": 0,
      "status": 0,
      "deleted": false,
      "price": 0.0
    }
    if(this.request.status==0) {
      this.status = 'ACCEPTED';
    } else if(this.request.status==1) {
      this.status = 'DENIED';
    } else {
      this.status = 'WAITING';
    }
    this.accommodation = {
      "id": 2,
      "title": "Luxury Villa",
      "description": "A luxurious villa with stunning views.",
      "address": {
        "id": 2,
        "street": "123 Main Street",
        "city": "New York",
        "latitude": 17.36,
        "longitude": 71.18,
        "accommodation": {}
      },
      "amenities": [
        {
          "id": 4,
          "name": "free cancellation",
          "image_path": "../../../assets/images/icons8-calendar-32.png",
          "accommodation": {}
        },
        {
          "id": 5,
          "name": "wifi",
          "image_path": "../../../assets/images/icons8-wifi-30.png",
          "accommodation": {}
        }
      ],
      "images": [
        {
          "id": 5,
          "path_front": "../../assets/images/living-room.jpg",
          "path_mobile": "../../../../../res/drawable/living-room.jpg",
          "accommodation": {}
        },
        {
          "id": 6,
          "path_front": "../../assets/images/living-room.jpg",
          "path_mobile": "../../../../../res/drawable/living-room.jpg",
          "accommodation": {}
        },
        {
          "id": 7,
          "path_front": "../../assets/images/kitchen-2165756_640.jpg",
          "path_mobile": "../../../../../res/drawable/kitchen-2165756_640.jpg",
          "accommodation": {}
        }
      ],
      "availabilities": [
        {
          "startDate": {},
          "endDate": {}
        },
      ],
      "prices": [
        {
          "id": 4,
          "accommodation": {
            "id": 2,
            "title": "Luxury Villa",
            "description": "A luxurious villa with stunning views.",
            "shortDescription": "Luxury villa with pool",
            "owner_id": 6,
            "deadline": 30,
            "min_capacity": 1,
            "max_capacity": 3,
            "type": "HOTEL",
            "accepted": true,
            "manual_accepting": false
          },
          "cost": 125.0,
          "fromDate": "2023-12-31T23:00:00.000+00:00",
          "toDate": "2024-01-09T23:00:00.000+00:00",
          "type": "PER_GUEST"
        },
        {
          "id": 5,
          "accommodation": {
            "id": 2,
            "title": "Luxury Villa",
            "description": "A luxurious villa with stunning views.",
            "shortDescription": "Luxury villa with pool",
            "owner_id": 6,
            "deadline": 30,
            "min_capacity": 1,
            "max_capacity": 3,
            "type": "HOTEL",
            "accepted": true,
            "manual_accepting": false
          },
          "cost": 120.0,
          "fromDate": "2024-02-14T23:00:00.000+00:00",
          "toDate": "2024-02-27T23:00:00.000+00:00",
          "type": "PER_GUEST"
        },
        {
          "id": 6,
          "accommodation": {
            "id": 2,
            "title": "Luxury Villa",
            "description": "A luxurious villa with stunning views.",
            "shortDescription": "Luxury villa with pool",
            "owner_id": 6,
            "deadline": 30,
            "min_capacity": 1,
            "max_capacity": 3,
            "type": "HOTEL",
            "accepted": true,
            "manual_accepting": false
          },
          "cost": 125.0,
          "fromDate": "2024-03-19T23:00:00.000+00:00",
          "toDate": "2024-04-04T22:00:00.000+00:00",
          "type": "PER_GUEST"
        }
      ],
      "ratings": [
        {
          "id": 3,
          "accommodation": {
            "id": 2,
            "title": "Luxury Villa",
            "description": "A luxurious villa with stunning views.",
            "shortDescription": "Luxury villa with pool",
            "owner_id": 6,
            "deadline": 30,
            "min_capacity": 1,
            "max_capacity": 3,
            "type": "HOTEL",
            "accepted": true,
            "manual_accepting": false
          },
          "guest": {
            "id": 1,
            "name": "Marko",
            "surname": "Marković",
            "email": "email1@gmail.com",
            "password": "$2a$12$k1vdJAgwlLoYFDid2OlqzOD0KvHmMS936DbLJZjaC3UgITjiM8gBe",
            "address": "adresa1",
            "phone": "060000000",
            "role": "GUEST",
            "lastPasswordResetDate": null,
            "activationLink": "activation_link1",
            "activated": true,
            "activationExpired": false,
            "activationTimestamp": null,
            "reported": false,
            "blocked": false,
            "deleted": false,
            "favouriteAccommodations": [
              1,
              2
            ],
            "credentialsNonExpired": true,
            "accountNonExpired": true,
            "username": "email1@gmail.com",
            "authorities": [
              {
                "authority": "GUEST"
              }
            ],
            "accountNonLocked": true,
            "enabled": true
          },
          "rate": 4.5,
          "date": "2024-09-24T22:00:00.000+00:00",
          "reported": false
        }
      ],
      "comments": [
        {
          "id": 3,
          "accommodation": {
            "id": 2,
            "title": "Luxury Villa",
            "description": "A luxurious villa with stunning views.",
            "shortDescription": "Luxury villa with pool",
            "owner_id": 6,
            "deadline": 30,
            "min_capacity": 1,
            "max_capacity": 3,
            "type": "HOTEL",
            "accepted": true,
            "manual_accepting": false
          },
          "user": {
            "id": 1,
            "name": "Marko",
            "surname": "Marković",
            "email": "email1@gmail.com",
            "password": "$2a$12$k1vdJAgwlLoYFDid2OlqzOD0KvHmMS936DbLJZjaC3UgITjiM8gBe",
            "address": "adresa1",
            "phone": "060000000",
            "role": "GUEST",
            "lastPasswordResetDate": null,
            "activationLink": "activation_link1",
            "activated": true,
            "activationExpired": false,
            "activationTimestamp": null,
            "reported": false,
            "blocked": false,
            "deleted": false,
            "favouriteAccommodations": [
              1,
              2
            ],
            "credentialsNonExpired": true,
            "accountNonExpired": true,
            "username": "email1@gmail.com",
            "authorities": [
              {
                "authority": "GUEST"
              }
            ],
            "accountNonLocked": true,
            "enabled": true
          },
          "content": "Lovely cabin, enjoyed every moment.",
          "date": "2024-09-24T22:00:00.000+00:00",
          "reported": false
        },
        {
          "id": 6,
          "accommodation": {
            "id": 2,
            "title": "Luxury Villa",
            "description": "A luxurious villa with stunning views.",
            "shortDescription": "Luxury villa with pool",
            "owner_id": 6,
            "deadline": 30,
            "min_capacity": 1,
            "max_capacity": 3,
            "type": "HOTEL",
            "accepted": true,
            "manual_accepting": false
          },
          "user": {
            "id": 2,
            "name": "Petar",
            "surname": "Petrović",
            "email": "email2@gmail.com",
            "password": "$2a$12$80PJwk0RVWpOhHpRKCuAc.gItzmXkzXavaDr8XIijSCUC1HToFqmu",
            "address": "adresa2",
            "phone": "060000001",
            "role": "OWNER",
            "lastPasswordResetDate": null,
            "activationLink": "activation_link2",
            "activated": true,
            "activationExpired": false,
            "activationTimestamp": null,
            "reported": false,
            "blocked": false,
            "deleted": false,
            "credentialsNonExpired": true,
            "accountNonExpired": true,
            "username": "email2@gmail.com",
            "authorities": [
              {
                "authority": "OWNER"
              }
            ],
            "accountNonLocked": true,
            "enabled": true
          },
          "content": "Cozy and charming, highly recommend!",
          "date": "2024-09-27T22:00:00.000+00:00",
          "reported": false
        }
      ],
      "owner_id": 6,
      "min_capacity": 1,
      "max_capacity": 3,
      "manual_accepting": false
    }
  }
}
