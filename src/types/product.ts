export type Product = {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: {
    rate: number
    count: number
  }
  title: string
  quantity?: number
}

export type Categories = 'electronics' | 'jewelry' | "men's clothing" | "women's clothing" | ''

export type PriceTypeOrder = 'asc' | 'desc'

export interface Comments {
  username: number
  text: string
  timestamp: string
}

export type customerInformation = {
  FirstName: string
  LastName: string
  Email: string
  Address: string
  City: string
  Postcode: number
}
