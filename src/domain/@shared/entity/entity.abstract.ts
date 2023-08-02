import Notification from '../notification/notification'

export default abstract class Entity {
  protected _id: string
  protected _name: string
  protected notification: Notification

  constructor() {
    this.notification = new Notification()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }
}