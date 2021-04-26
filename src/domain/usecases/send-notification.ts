import { Notification } from '../models/notification'

export interface SendNotification {
  send: (message: Notification) => Promise<HttpResponse>
}
