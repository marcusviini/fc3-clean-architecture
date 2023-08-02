import ProductRepositoryInterface from '../../../domain/repository/product.repository.interface'
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto'
import { ProductFactory } from '../../../domain/factory/product.factory'

export default class CreateProductUseCase {
  private productRepositoryInterface: ProductRepositoryInterface

  constructor(productRepositoryInterface: ProductRepositoryInterface) {
    this.productRepositoryInterface = productRepositoryInterface
  }

  async execute(input: InputCreateProductDto) : Promise<OutputCreateProductDto> {
    const product = ProductFactory.create({ name: input.name, price: input.price }) 
    
    await this.productRepositoryInterface.create(product)
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}