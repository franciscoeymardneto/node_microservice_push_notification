import { SendNotification } from '../../domain/usecases/send-notification'
import { MissingParamError } from '../error/missing-param-erro'
import { badRequest, serverError, success } from '../helpers/response-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SendNotificationController implements Controller {
  private readonly sendNotification: SendNotification
  constructor (sendNotification: SendNotification) {
    this.sendNotification = sendNotification
  }

  async handle (params: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['to', 'title', 'body']

      for (const param of requiredParams) {
        if (!params.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }
      return success('succes')
    } catch (error) {
      return serverError(error)
    }
  }
}
