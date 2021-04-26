import { HttpResponse } from '../../presentation/protocols/http'
import { Notification } from '../models/notification'

export interface SendNotification {
  send: (message: Notification) => Promise<HttpResponse>
}
