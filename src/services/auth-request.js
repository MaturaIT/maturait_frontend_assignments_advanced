import AxiosInstance from './axios-instance'

class AuthRequest {
  loginUser(user) {
    const url = '/auth/login'
    return AxiosInstance.post(url, user)
  }
}

export default new AuthRequest()
