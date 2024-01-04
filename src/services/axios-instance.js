import queryString from 'query-string'
import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.com';

const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  paramsSerializer: params => queryString.stringify(params),
  responseEncoding: 'utf8',
})

AxiosInstance.interceptors.request.use(
  async(request) => {
    const token = localStorage.getItem('token')
    request.headers.Authorization = token ? `Bearer ${token}` : ''
    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

AxiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data)
      return response.data

    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default AxiosInstance
