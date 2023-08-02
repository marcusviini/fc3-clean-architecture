import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../db/sequelize/model/customer.model'
import ProductModel from '../db/sequelize/model/product.model'
import { customerRoutes } from './routes/customer.routes'
import { productRoutes } from './routes/product.routes'

export const app : Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use([customerRoutes, productRoutes])

export let sequelize : Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })
  sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
}

setupDb()