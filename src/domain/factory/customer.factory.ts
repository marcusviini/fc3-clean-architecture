import crypto from 'crypto'

import Customer  from '../entity/customer'
import Address from '../entity/address'

interface CreateCustomerWithAddressInterface {
	name: string

	address: {
		street: string
		number: number
		zipCode: string
		city: string
	}
}

export class CustomerFactory {
	public static create(name: string): Customer {
		const uuid = crypto.randomUUID();
		return new Customer(uuid, name);
	}

	public static createWithAddress(data: CreateCustomerWithAddressInterface): Customer {
		const uuid = crypto.randomUUID();
		const { name, address } = data;
		const { street, number, zipCode, city } = address;

		const addressOfCustomer = new Address(street, number, zipCode, city);
		const customer = new Customer(uuid, name);
		customer.setAddress(addressOfCustomer);

		return customer;
	}
}