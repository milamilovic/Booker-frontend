import {User} from "../../model/user.model";

export interface Owner extends User {
  reported: boolean;
  blocked: boolean;
  deleted: boolean;
  requestNotificationEnabled: boolean;
  cancellationNotificationEnabled: boolean;
  ratingNotificationEnabled: boolean;
  accNotificationEnabled: boolean;
}
