import express, { Request, Response } from 'express'
import CreateCustomerUsecase from '../../../usecase/customer/create/create.customer.usecase'
import CustomerRepository from '../../repository/customer.repository'
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase'

export const customerRoutes = express.Router()

customerRoutes.post('/customer', async(req: Request, res: Response) => {
  const usecase = new CreateCustomerUsecase(new CustomerRepository())
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zipCode: req.body.address.zipCode
      }
    }
    const customer = await usecase.execute(customerDto)
    res.status(201).json(customer)
  } catch (error){
    res.status(500).json({ message: error })
  }
})

customerRoutes.get('/customers', async(req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository())
  try {
    const customers = await usecase.execute()
    res.send(customers)
  } catch (error){
    res.status(500).json({ message: error })
  }
})