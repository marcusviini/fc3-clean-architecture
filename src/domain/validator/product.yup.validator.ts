import { ValidatorInterface } from '../@shared/validator/validator.interface'
import Product from '../entity/product'
import * as yup from 'yup'

export class ProductYupValidator implements ValidatorInterface<Product> {
	validate(entity: Product): void {
		const { id, name, price } = entity;
		try {
			yup.object()
				.shape({
					id: yup.string().required('Id is required'),
					name: yup.string().required('Name is required').matches(/^s*[\S]+(\s[\S]+)+\s*$/, 'Name must contain at least two words'),
					price: yup.number().required('Price is required').min(0, 'Price must be greater than zero')
				})
				.validateSync({ id, name, price }, { abortEarly: false })
		} catch (errors) {
			const e = errors as yup.ValidationError
			e.errors.forEach((error: string) => {
				entity.notification.addError({
					context: 'product',
					message: error
				})
			})
		}
	}
}