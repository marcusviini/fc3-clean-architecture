import { CustomerFactory } from '../../src/domain/factory/customer.factory'

describe('Customer Factory unit tests', () => {
	const address = {
		street: 'Wilkie Way',
		number: 4290,
		zipCode: '94306',
		city: 'Palo Alto, CA'
	}

	it('Should create a customer with an address', () => {
		const customer = CustomerFactory.createWithAddress({
			name: 'John Doe',
			address
		})

		expect(customer.id).toBeDefined()
		expect(customer.name).toBe('John Doe')

		expect(customer.getAddress()?.street).toBe(address.street)
		expect(customer.getAddress()?.number).toBe(address.number)
		expect(customer.getAddress()?.zipCode).toBe(address.zipCode)
		expect(customer.getAddress()?.city).toBe(address.city)
	});

	it('Should create a customer without address', () => {
		const customer = CustomerFactory.create('John Doe')

		expect(customer.id).toBeDefined()
		expect(customer.name).toBe('John Doe')
		expect(customer.getAddress()).toBeFalsy()
	})

})