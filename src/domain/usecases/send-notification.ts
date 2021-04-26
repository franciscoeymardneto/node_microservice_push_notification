import { HttpResponse } from '../../presentation/protocols/http'
import { Notification } from '../models/notification'

export interface SendNotification {
  send: (params: Notification) => Promise<HttpResponse>
}
