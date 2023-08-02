import ProductRepositoryInterface from '../../../domain/repository/product.repository.interface'

export default class ListCustomerUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute() {
    const products = await this.productRepository.findAll()
    return products
  }
}