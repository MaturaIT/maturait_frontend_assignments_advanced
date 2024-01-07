export interface Product {
  id: number
  title: string
  image: string
  price: number
  rating: {
    rate: number
    count: number
  }
  description: string
}

export interface Comment {
  id: number
  text: string
  user: string
  date: string
}