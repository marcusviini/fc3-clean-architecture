import { CustomerFactory } from '../../src/domain/factory/customer.factory'
import ListCustomersUseCase from '../../src/usecase/customer/list/list.customer.usecase'
import Address from '../../src/domain/entity/address'

const address = new Address('Wilkie Way',4290,'94306','Palo Alto, CA')

const customer1 = CustomerFactory.createWithAddress({
  name: 'John Doe1',
  address
})

const customer2 =  CustomerFactory.createWithAddress({
  name: 'John Doe2',
  address
})

const mockCustomerRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  }
}

describe('Unit test ListCustomers use case', () => {
  it('Should list all customers', async () => {
    const customerRepository = mockCustomerRepository()
    customerRepository.findAll.mockReturnValue(Promise.resolve([customer1, customer2]))
    const listCustomersUseCase = new ListCustomersUseCase(customerRepository)
    const customers = await listCustomersUseCase.execute()
    expect(customers.length).toBe(2)
    expect(customers).toStrictEqual([customer1, customer2])
  })
})