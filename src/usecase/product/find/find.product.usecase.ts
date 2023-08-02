import ProductRepositoryInterface from '../../../domain/repository/product.repository.interface'

export default class FindProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(id: string) {
    const product = await this.productRepository.find(id)
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}