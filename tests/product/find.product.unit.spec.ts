
import Product from '../../src/domain/entity/product'
import FindProductUseCase from '../../src/usecase/product/find/find.product.usecase'


const product = new Product('1', 'Product 1', 100)

const MockProductRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn()
  }
}

describe('Unit Test find product use case', () => {
  it('Should find a customer', async () => {
    const productRepository = MockProductRepository()
    const useCase = new FindProductUseCase(productRepository)
    await productRepository.create(product)
    await productRepository.find('1')
    const output = {
      id: '1',
      name: 'Product 1',
      price: 100
    }
    expect(await useCase.execute('1')).toEqual(output)
  })
})