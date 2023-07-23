import { Sequelize } from 'sequelize-typescript'

import Customer from '../../src/domain/entity/customer'
import Address from '../../src/domain/entity/address'
import CustomerModel from '../../src/infrastructure/db/sequelize/model/customer.model'
import CustomerRepository from '../../src/infrastructure/repository/customer.repository'
import FindCustomerUseCase from '../../src/usecase/customer/find/find.customer.usecase'

describe('Test find customer use case', () => {
  let sequelize: Sequelize
  beforeEach(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([
      CustomerModel
    ])
    return sequelize.sync()
  })
  afterEach(() => sequelize.close())
  it('Should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const useCase = new FindCustomerUseCase(customerRepository)
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipCode 1', 'City 1')
    customer.changeAddress(address)
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
})