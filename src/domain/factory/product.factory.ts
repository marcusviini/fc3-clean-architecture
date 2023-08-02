import crypto from 'crypto'

import Product  from '../entity/product'

interface CreateProductInterface {
	name: string
	price: number
}

export class ProductFactory {
	public static create(data: CreateProductInterface): Product {
		const uuid = crypto.randomUUID();
		return new Product(uuid, data.name, data.price);
	}
}