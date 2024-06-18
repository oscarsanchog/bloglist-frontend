import axios from 'axios'
import url from './url'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(url.base + url.blogEndpoint)
  return response.data
}

const postOne = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(url.base + url.blogEndpoint, newBlog, config)
  return response.data
}

export default { getAll, postOne, setToken }
