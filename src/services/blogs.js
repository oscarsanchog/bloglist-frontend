import axios from 'axios'
import url from './url'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const sortingBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)


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

const putFavorite = async (blogId, likeObject) => {
  const response = await axios.put(`${url.base}${url.blogEndpoint}/${blogId}`, likeObject)
  return response.data
}

const deleteOne = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.delete(`${url.base}${url.blogEndpoint}/${blogId}`, config) 
}

export default { getAll, postOne, setToken, putFavorite, deleteOne, sortingBlogs }
