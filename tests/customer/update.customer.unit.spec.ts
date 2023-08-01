import { CustomerFactory } from '../../src/domain/factory/customer.factory'
import UpdateCustomerUseCase from '../../src/usecase/customer/update/update.customer.usecase'
import Address from '../../src/domain/entity/address'

const address = new Address('Wilkie Way',4290,'94306','Palo Alto, CA')
const customer = CustomerFactory.createWithAddress({
    name: 'John Doe',
    address
})

const input = {
    id: customer.id,
    name: 'John updated',
    address: {
        street: 'Main Street',
        number: 123,
        zipCode: '10001',
        city: 'New York',
    }
}

const mockCustomerRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test UpdateCustomer use case', () => {
  it('Should update a customer', async () => {
    const customerRepository = mockCustomerRepository()
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)
    const customerUpdated = await updateCustomerUseCase.execute(input)
    expect(customerUpdated).toStrictEqual(input)
  })
  it('Should throw an error when customer name is invalid', async () => {
    const customerRepository = mockCustomerRepository()
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)
    input.name = ''
    await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
  })
})


