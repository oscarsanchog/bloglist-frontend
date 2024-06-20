import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import Togglabe from './components/Togglabe'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    user && blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleOnChange = (event) => {
    if (event.target.id === 'username') setUsername(event.target.value)
    if (event.target.id === 'password') setPassword(event.target.value)
  }

  const handleOnClick = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    //blogService.setToken(null)
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
      console.error(error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleOnChange={handleOnChange}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <p>User: {user.name}</p>
          <button onClick={handleOnClick}>Logout</button>
          <Togglabe showLabel='Create blog' hideLabel='Cancel' ref={blogFormRef}>
            <BlogForm
              postBlog={postBlog}
            />
          </Togglabe>
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App
