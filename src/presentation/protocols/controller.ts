import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  handle: (stompRequest: HttpRequest) => Promise<HttpResponse>
}
