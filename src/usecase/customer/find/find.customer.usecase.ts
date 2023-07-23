import CustomerRepositoryInterface from '../../../domain/repository/customer.repository.interface'

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(id: string) {
    const customer = await this.customerRepository.find(id)
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