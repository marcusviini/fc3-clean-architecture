import CreateProductUseCase from '../../src/usecase/product/create/create.product.usecase'

const input = {
  name: 'Product 1',
  price: 100,
}

const mockProductRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test CreateProduct use case', () => {
  it('Should create a product', async () => {
    const productRepository = mockProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const customer = await createProductUseCase.execute(input)
    expect(customer).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })
  it('Should throw an error when product name is invalid', async () => {
    const productRepository = mockProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    input.name = ''
    await expect(createProductUseCase.execute(input)).rejects.toThrow('Name is required')
  })

  
  it('Should throw an error when product price is invalid', async () => {
    const productRepository = mockProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    input.name = 'teste 1'
    input.price = -1
    await expect(createProductUseCase.execute(input)).rejects.toThrow('product: Price must be greater than zero')
  })
})