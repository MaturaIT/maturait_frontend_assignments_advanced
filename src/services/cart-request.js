import AxiosInstance from './axios-instance'

class CartRequest {
  getCart() {
    const url = '/carts'
    return AxiosInstance.get(url)
  }

  updateCart(product_model_id, data) {
    const url = `/carts/${product_model_id}`
    return AxiosInstance.put(url, data)
  }

  addCart(data) {
    const url = '/carts'
    return AxiosInstance.post(url, data)
  }

  deleteCart(product_model_id) {
    const url = `/carts/${product_model_id}`
    return AxiosInstance.delete(url)
  }
}
export default new CartRequest()
