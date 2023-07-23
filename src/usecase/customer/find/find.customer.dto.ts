export interface InputFindCustomerDto {
  id: string
}

export interface OutputFindCustomerDto {
  id: string
  name: string
  address: {
    name: string
    street: string
    number: number
    zipCode: string
    city: string
  }
}