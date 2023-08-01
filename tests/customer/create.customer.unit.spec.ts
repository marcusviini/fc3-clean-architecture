import CreateCustomerUseCase from '../../src/usecase/customer/create/create.customer.usecase'
const input = {
  name: 'John Doe',
  address: {
    street: 'Main Street',
    number: 123,
    zipCode: '10001',
    city: 'New York',    
  }
}

const mockCustomerRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test CreateCustomer use case', () => {
  it('Should create a customer', async () => {
    const customerRepository = mockCustomerRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)
    const customer = await createCustomerUseCase.execute(input)
    expect(customer).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipCode: input.address.zipCode,
        city: input.address.city
      }
    })
  })
})