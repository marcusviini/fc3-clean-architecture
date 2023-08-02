import { Sequelize } from 'sequelize-typescript'

import Product from '../../src/domain/entity/product'
import ProductModel from '../../src/infrastructure/db/sequelize/model/product.model'
import ProductRepository from '../../src/infrastructure/repository/product.repository'
import FindProductUseCase from '../../src/usecase/product/find/find.product.usecase'

describe('Test find product use case', () => {
  let sequelize: Sequelize
  beforeEach(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([
      ProductModel
    ])
    return sequelize.sync()
  })
  afterEach(() => sequelize.close())
  it('Should find a product', async () => {
    const productRepository = new ProductRepository()
    const useCase = new FindProductUseCase(productRepository)
    const product = new Product('1', 'Product 1', 10)
    await productRepository.create(product)
    const output = {
      id: '1',
      name: 'Product 1',
      price: 10,
    }
    expect(await useCase.execute('1')).toEqual(output)
  })
})