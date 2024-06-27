import axios from 'axios'
import endpoints from './endpoints'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const sortingBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const getAll = async () => {
  const response = await axios.get(endpoints.blog)
  return response.data
}

const postOne = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(
    endpoints.blog,
    newBlog,
    config
  )
  return response.data
}

const putFavorite = async (blogId, likeObject) => {
  const response = await axios.put(
    `${endpoints.blog}/${blogId}`,
    likeObject
  )
  return response.data
}

const deleteOne = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.delete(`${endpoints.blog}/${blogId}`, config)
}

export default {
  getAll,
  postOne,
  setToken,
  putFavorite,
  deleteOne,
  sortingBlogs,
}
