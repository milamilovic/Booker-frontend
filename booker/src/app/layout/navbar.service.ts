import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  myEvent = new EventEmitter<any>();

  triggerEvent() {
    this.myEvent.emit();
  }
  constructor() { }
}
