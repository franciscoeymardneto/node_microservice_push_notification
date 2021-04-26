export interface HttpRequest {
  to: string
  title: string
  body: string
}

export interface HttpResponse {
  statusCode: number
  body?: any
}
