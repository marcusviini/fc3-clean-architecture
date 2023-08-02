import Entity from '../@shared/entity/entity.abstract'
import NotificationError from '../@shared/notification/notification.error'

export default class Product extends Entity {
  private _price: number

  constructor(id: string, name: string, price: number) {
    super()
    this._id = id
    this._name = name
    this._price = price
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
  
  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }


  validate(): boolean {
    if (!this._id.length) {
      this.notification.addError({
        context: 'product', 
        message: 'Id is required'
      })
    }
    if (!this._name) {
      this.notification.addError({
        context: 'product', 
        message: 'Name is required'
      })
    }
    if (!this._price) {
      this.notification.addError({
        context: 'product', 
        message: 'Price is required'
      })
    }
    if (this._price < 0) {
      this.notification.addError({
        context: 'product', 
        message: 'Price must be greater than zero'
      })
    }
    return true
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changePrice(price: number) {
    this._price = price
    this.validate()
  }
}
