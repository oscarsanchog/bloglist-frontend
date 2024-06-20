import { useState } from 'react'

const LoginForm = ({ loginUser }) => {
  const emptyForm = { username: '', password: '' }
  const [credentials, setCredentials] = useState(emptyForm)

  const loginHandler = (event) => {
    event.preventDefault()
    loginUser(credentials)
  }

  const handleOnChangeCredentials = (event) => {
    setCredentials({
      ...credentials,
      [event.target.id]: event.target.value,
    })
  }

  return (
    <form onSubmit={loginHandler}>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          value={credentials.username}
          name='username'
          onChange={handleOnChangeCredentials}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={credentials.password}
          name='password'
          onChange={handleOnChangeCredentials}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm
