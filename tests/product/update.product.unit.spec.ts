import { ProductFactory } from '../../src/domain/factory/product.factory'
import UpdateProductUseCase from '../../src/usecase/product/update/update.product.usecase'

const product = ProductFactory.create({
  name: 'Product 1',
  price: 100  
})

const input = {
  id: product.id,
  name: 'Product 1',
  price: 100
}

const mockProductRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test UpdateProduct use case', () => {
  it('Should update a product', async () => {
    const productRepository = mockProductRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const productUpdated = await updateProductUseCase.execute(input)
    expect(productUpdated).toStrictEqual(input)
  })
  it('Should throw an error when customer name is invalid', async () => {
    const productRepository = mockProductRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    input.name = ''
    await expect(updateProductUseCase.execute(input)).rejects.toThrow('Name is required')
  })
})


