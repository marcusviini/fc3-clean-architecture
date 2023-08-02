import { ProductFactory } from '../../src/domain/factory/product.factory'
import ListProductsUseCase from '../../src/usecase/product/list/list.product.usecase'

const product1 = ProductFactory.create({
  name: 'Product 1',
  price: 100
})

const product2 =  ProductFactory.create({
  name: 'Product 2',
  price: 100
})

const mockProductRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  }
}

describe('Unit test ListProducts use case', () => {
  it('Should list all products', async () => {
    const productRepository = mockProductRepository()
    productRepository.findAll.mockReturnValue(Promise.resolve([product1, product2]))
    const listCustomersUseCase = new ListProductsUseCase(productRepository)
    const customers = await listCustomersUseCase.execute()
    expect(customers.length).toBe(2)
    expect(customers).toStrictEqual([product1, product2])
  })
})