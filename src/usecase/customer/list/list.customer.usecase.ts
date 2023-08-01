import CustomerRepositoryInterface from '../../../domain/repository/customer.repository.interface'

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute() {
    const customers = await this.customerRepository.findAll()
    return customers
  }
}