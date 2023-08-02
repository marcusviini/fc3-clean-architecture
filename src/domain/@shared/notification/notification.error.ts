export default class NotificationError extends Error {
  constructor(public errors: NotificationError[]) {
    super()
  }
}