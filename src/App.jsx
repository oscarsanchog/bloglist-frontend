import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import Togglabe from './components/Togglabe'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const messageHandler = (error) => {
    console.error(error)
    setErrorMessage(error.response.data.message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const loginUser = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      messageHandler(error)
    }
  }

  const handleOnClickLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const postBlog = async (blogObject) => {
    try {
      const newBlogObject = {
        ...blogObject,
        user: user.id,
      }
      const createdBlog = await blogService.postOne(newBlogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat({ ...createdBlog, user: user }))
    } catch (error) {
      messageHandler(error)
    }
  }

  const putFavorite = async (blogId, likeObject) => {
    try {
      const updatedBlog = await blogService.putFavorite(blogId, likeObject)

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === updatedBlog.id
            ? { ...blog, likes: updatedBlog.likes }
            : blog
        )
      )
    } catch (error) {
      messageHandler(error)
    }
  }

  const deleteOneBlog = async (blogId) => {
    try {
      const response = await blogService.deleteOne(blogId)
      response.status === 204 &&
        setBlogs((prevblogs) => prevblogs.filter((blog) => blog.id !== blogId))
    } catch (error) {
      messageHandler(error)
    }
  }

  return (
    <main>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm loginUser={loginUser} />
      ) : (
        <>
          <p>User: {user.name}</p>
          <button onClick={handleOnClickLogout}>Logout</button>
          <Togglabe
            showLabel='Create blog'
            hideLabel='Cancel'
            ref={blogFormRef}
          >
            <BlogForm postBlog={postBlog} />
          </Togglabe>
          <Blogs
            blogs={blogs}
            putFavorite={putFavorite}
            deleteOneBlog={deleteOneBlog}
          />
        </>
      )}
    </main>
  )
}

export default App
