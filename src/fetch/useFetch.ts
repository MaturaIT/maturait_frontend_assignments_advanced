import axios from 'axios'
import { type Product, type Categories } from '@/types/product'

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://fakestoreapi.com/products')
  return response.data
}

export const fetchAllCategories = async (): Promise<Categories[]> => {
  const response = await axios.get('https://fakestoreapi.com/products/categories')
  return response.data
}
