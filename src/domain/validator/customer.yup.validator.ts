import { ValidatorInterface } from '../@shared/validator/validator.interface'
import Customer from '../entity/customer'
import * as yup from 'yup'

export class CustomerYupValidator implements ValidatorInterface<Customer> {
	validate(entity: Customer): void {
		const { id, name } = entity;
		try {
			yup.object()
				.shape({
					id: yup.string().required('Id is required'),
					name: yup.string().required('Name is required').matches(/^s*[\S]+(\s[\S]+)+\s*$/, 'Name must contain at least two words'),
				})
				.validateSync({ id, name }, { abortEarly: false })
		} catch (errors) {
			const e = errors as yup.ValidationError
			e.errors.forEach((error: string) => {
				entity.notification.addError({
					context: 'customer',
					message: error
				})
			})
		}
	}
}