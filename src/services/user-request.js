import AxiosInstance from './axios-instance.js'

class UserRequest {
  getUsers() {
    const url = '/users';
    return AxiosInstance.get(url);
  }

  getUsersById(userId) {
    const url = `/users/${userId}`;
    return AxiosInstance.get(url);
  }
}
export default new UserRequest()
