import axios from 'axios'
import url from './url'

const login = async (credentials) => {
  const response = await axios.post(url.base + url.loginEndpoint, credentials)
  return response.data
}

export default { login }
