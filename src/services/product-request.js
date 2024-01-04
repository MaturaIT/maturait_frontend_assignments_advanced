import AxiosInstance from './axios-instance'

class ProductRequest {
  searchProducts() {
    const url = '/products'
    return AxiosInstance.get(url)
  }
  
  getProductsById(id) {
    const url = `/products/${id}`
    return AxiosInstance.get(url)
  }

  getProductsByQuery(query) {
    const url = `/products/${query}`
    return AxiosInstance.get(url)
  }

  getAllCategories() {
    const url = `/products/categories`
    return AxiosInstance.get(url)
  }

  getProductsByCategories(categories) {
    const url = `/products/${categories}`
    return AxiosInstance.get(url)
  }

}

export default new ProductRequest()
