import { SendNotificationController } from './send-notification.controller'

type SutTypes = {
  sut: SendNotificationController
}
const makeSut = (): SutTypes => {
  const sut = new SendNotificationController()

  return {
    sut
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

    const httpResponse = await sut.send(notification)
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

    const httpResponse = await sut.send(notification)
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

    const httpResponse = await sut.send(notification)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: body'))
  })
})
