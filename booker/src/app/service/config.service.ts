import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _api_url = "http://localhost:8080/api";
  private _auth_url = "http://localhost:8080/api/users";
  private _user_url = this._api_url + "/users";

  private _login_url = this._auth_url + "/login";

  constructor() { }

  get login_url(): string {
    return this._login_url
  }

  private _whoami_url = this._api_url + "/whoami";

  get whoami_url() :string {
    return this._whoami_url;
  }

  get auth_url(): string {
    return this._auth_url;
  }


  private _users_url = this._user_url + "/all";

  private _guests_url:string = this._api_url + "/guests";

  private _owners_url:string = this._api_url + "/owners";

  private _admins_url:string = this._api_url + "/admin";

  get users_url(): string {
    return this._users_url;
  }

  get user_url(): string {
    return this._user_url;
  }
  get guests_url(): string{
    return this._guests_url;
  }

  get owners_url(): string{
    return this._owners_url;
  }

  get admin_url(): string{
    return this._admins_url;
  }

  private _signup_url = this._auth_url + "/signup";

  get signup_url(): string {
    return this._signup_url;
  }

  private _accommodations_url = this._api_url + "/accommodations";
  get accommodations_url(): string {
    return this._accommodations_url;
  }
}
