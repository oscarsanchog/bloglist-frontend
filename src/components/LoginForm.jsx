import { useState } from 'react'
import PropTypes from 'prop-types'

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
          data-testid='username'
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
          data-testid='password'
          value={credentials.password}
          name='password'
          onChange={handleOnChangeCredentials}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

export default LoginForm
