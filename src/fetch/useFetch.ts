import axios from 'axios'
import { type Product, type Categories } from '@/types/product'

const BASE_URL = 'https://fakestoreapi.com/products'

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}`)
  return response.data
}

export const fetchAllCategories = async (): Promise<Categories[]> => {
  const response = await axios.get(`${BASE_URL}/categories`)
  return response.data
}

export const topArrival = async (limit: number): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}?limit=${limit}`)
  return response.data
}

export const singleProduct = async (id: number): Promise<Product> => {
  const response = await axios.get('https://fakestoreapi.com/products/' + id)
  return response.data
}
