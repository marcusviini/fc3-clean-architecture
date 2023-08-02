import { app, sequelize } from '../../../src/infrastructure/api/express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(() => sequelize.sync({ force: true }))
  afterAll(() => sequelize.close())

  it('Should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Rua 1',
          city: 'São Paulo',
          number: 123,
          zipCode: '12345-123'
        }
      })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name', 'John Doe')
    expect(response.body).toHaveProperty('address')
  })

  it('Should not create a customer with return errors', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Rua 1',
          city: 'São Paulo',
          number: 123
        }
      })
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
  })
  it('Should list all customers', async () => {
    const customer1 = await request(app).post('/customer').send({
      name: 'John Doe',
      address: {
        street: 'Rua 1',
        city: 'São Paulo',
        number: 123,
        zipCode: '12345-123'
      }
    })
    expect(customer1.status).toBe(201)

    const customer2 = await request(app).post('/customer').send({
      name: 'John Doe',
      address: {
        street: 'Rua 1',
        city: 'São Paulo',
        number: 123,
        zipCode: '12345-123'
      }
    })
    expect(customer2.status).toBe(201)

    const response = await request(app).get('/customers')
    expect(response.status).toBe(200)
  })
})