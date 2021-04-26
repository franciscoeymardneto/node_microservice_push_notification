import { SendNotification } from '../../domain/usecases/send-notification'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { SendNotificationController } from './send-notification.controller'

type SutTypes = {
  sut: SendNotificationController
  pushNotification: SendNotification
}

const pushNotificationStub = (): SendNotification => {
  class PushNotification implements SendNotification {
    async send (params: HttpRequest): Promise<HttpResponse> {
      const fakeResponse = {
        statusCode: 200
      }
      return await new Promise(resolve => resolve(fakeResponse))
    }
  }

  return new PushNotification()
}
const makeSut = (): SutTypes => {
  const pushNotification = pushNotificationStub()
  const sut = new SendNotificationController(pushNotification)
  return {
    sut,
    pushNotification
  }
}
describe('Send notification controlle', () => {
  test('Should return 400 if no To is provided ', async () => {
    const { sut } = makeSut()
    const notification = {
      body: {
        title: 'some_title',
        body: 'some_body'
      }
    }

    const httpResponse = await sut.handle(notification)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: to'))
  })

  test('Should return 400 if no Title is provided ', async () => {
    const { sut } = makeSut()
    const notification = {
      body: {
        to: 'some_to',
        body: 'some_body'
      }
    }

    const httpResponse = await sut.handle(notification)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: title'))
  })

  test('Should return 400 if no Body is provided ', async () => {
    const { sut } = makeSut()
    const notification = {
      body: {
        to: 'some_to',
        title: 'some_title'
      }
    }

    const httpResponse = await sut.handle(notification)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: body'))
  })
})
