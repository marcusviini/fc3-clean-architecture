import CustomerRepositoryInterface from '../../../domain/repository/customer.repository.interface'
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update.customer.dto'
import Address from '../../../domain/entity/address'

export default class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id)
    
    customer.changeName(input.name)
    customer.changeAddress(new Address(input.address.street, input.address.number, input.address.zipCode, input.address.city))

    await this.customerRepository.update(customer)
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zipCode: customer.address.zipCode,
        city: customer.address.city
      }
    }
  }
}