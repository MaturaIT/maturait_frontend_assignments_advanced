// fakestoreApi.ts
import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fakestoreApi = {
  async getProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getProductDetails(productId: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
