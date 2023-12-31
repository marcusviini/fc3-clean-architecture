import Entity from '../@shared/entity/entity.abstract'
import Address from './address'
import NotificationError from '../@shared/notification/notification.error'
import { CustomerValidatorFactory } from '../factory/customer.validator.factory'

export default class Customer extends Entity {
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get address(): Address {
    return this._address
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  validate() {
    CustomerValidatorFactory.create().validate(this)
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changeAddress(address: Address) {
    this._address = address
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if (!this._address) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

  setAddress(address: Address) {
		this._address = address;
		this._address.validate();
	}

  getAddress(): Address | null {
		return this._address ?? null;
	}

}
