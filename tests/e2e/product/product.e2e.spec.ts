import { app, sequelize } from '../../../src/infrastructure/api/express'
import request from 'supertest'

describe('E2E test for products', () => {
  beforeEach(() => sequelize.sync({ force: true }))
  afterAll(() => sequelize.close())
  it('Should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'Product 1',
        price: 10
      })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name', 'Product 1')
    expect(response.body).toHaveProperty('price', 10)
  })
  it('Should list all products', async () => {
    const product1 = await request(app).post('/product')
    .send({
      name: 'Product 1',
      price: 10
    })
    expect(product1.status).toBe(201)

    const product2 = await request(app).post('/product')
    .send({
      name: 'Product 2',
      price: 11
    })
    expect(product2.status).toBe(201)

    const response = await request(app).get('/products')
    expect(response.status).toBe(200)
  })
})