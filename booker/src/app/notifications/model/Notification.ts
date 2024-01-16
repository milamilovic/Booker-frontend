import {NotificationType} from "../../enums/notification-type";

export interface Notification{
  id?: number;
  userId: number;
  time: string;
  content: string;
  type: NotificationType;
}
