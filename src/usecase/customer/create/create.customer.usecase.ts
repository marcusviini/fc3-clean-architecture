import CustomerRepositoryInterface from '../../../domain/repository/customer.repository.interface'
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create.customer.dto'
import { CustomerFactory } from '../../../domain/factory/customer.factory'
import Address from '../../../domain/entity/address'

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputCreateCustomerDto) : Promise<OutputCreateCustomerDto> {
    const address = new Address(input.address.street, input.address.number, input.address.zipCode, input.address.city)
    const customer = CustomerFactory.createWithAddress({ name: input.name, address }) 
    
    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.getAddress()?.street,
        city: customer.getAddress()?.city,
        zipCode: customer.getAddress()?.zipCode,
        number: customer.getAddress()?.number
      }
    }
  }
}