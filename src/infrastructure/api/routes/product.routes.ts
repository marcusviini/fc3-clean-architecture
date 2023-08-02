import express, { Request, Response } from 'express'
import CreateProductUsecase from '../../../usecase/product/create/create.product.usecase'
import ProductRepository from '../../repository/product.repository'
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase'

export const productRoutes = express.Router()

productRoutes.post('/product', async(req: Request, res: Response) => {
  const usecase = new CreateProductUsecase(new ProductRepository())
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    }
    const product = await usecase.execute(productDto)
    res.status(201).json(product)
  } catch (error){
    console.log(error)
    res.status(500).json({ message: error })
  }
})

productRoutes.get('/products', async(req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository())
  try {
    const customers = await usecase.execute()
    res.send(customers)
  } catch (error){
    res.status(500).json({ message: error })
  }
})