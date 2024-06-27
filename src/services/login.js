import axios from 'axios'
import endpoints from './endpoints'

const login = async (credentials) => {
  const response = await axios.post(endpoints.login, credentials)
  return response.data
}

export default { login }
