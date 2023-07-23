
import Customer from '../../src/domain/entity/customer'
import Address from '../../src/domain/entity/address'
import FindCustomerUseCase from '../../src/usecase/customer/find/find.customer.usecase'


const customer = new Customer('1', 'Customer 1')
const address = new Address('Street 1', 1, 'zipCode 1', 'City 1')
customer.changeAddress(address)

const MockCustomerRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn()
  }
}

describe('Unit Test find customer use case', () => {
  it('Should find a customer', async () => {
    const customerRepository = MockCustomerRepository()
    const useCase = new FindCustomerUseCase(customerRepository)
    await customerRepository.create(customer)
    const output = {
      id: '1',
      name: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 1,
        zipCode: 'zipCode 1',
        city: 'City 1'
      }
    }
    expect(await useCase.execute('1')).toEqual(output)
  })
  it('Should not find a customer', () => {
    const customerRepository = MockCustomerRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const useCase = new FindCustomerUseCase(customerRepository)
    expect(() => useCase.execute('1')).rejects.toThrow('Customer not found')
  })
})