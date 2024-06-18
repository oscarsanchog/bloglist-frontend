import { useState, useEffect } from 'react'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', url: '' })
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.id]: event.target.value,
    })
  }

  const postBlog = async (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: newBlog.title,
        user: user.id,
        url: newBlog.url,
      }
      const createdBlog = await blogService.postOne(blogObject)
      //console.log(createdBlog)
      setBlogs(blogs.concat({ ...createdBlog, user: user }))
      setNewBlog({ title: '', url: '' })
    } catch (error) {
      console.error(error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>

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
          <BlogForm
            handleBlogChange={handleBlogChange}
            postBlog={postBlog}
            newBlog={newBlog}
          />
          <Blogs blogs={blogs}/>
        </div>
      )}
    </div>
  )
}

export default App
