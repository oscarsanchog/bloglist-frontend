const LoginForm = ({ handleLogin, username, password, handleOnChange }) => (
  <form onSubmit={handleLogin}>
    <div>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        value={username}
        name='username'
        onChange={handleOnChange}
      />
    </div>
    <div>
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        value={password}
        name='password'
        onChange={handleOnChange}
      />
    </div>
    <button type='submit'>Login</button>
  </form>
)

export default LoginForm
