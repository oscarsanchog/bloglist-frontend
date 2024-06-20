import BlogDetail from './BlogDetail'
import Togglabe from './Togglabe'

const Blog = ({ blog, putFavorite, deleteOneBlog }) => {
  const deleteBlog = () => {
    confirm(`Remove blog "${blog.title}" by ${blog.user.name}?`) &&
      deleteOneBlog(blog.id)
  }

  const DeleteButton = () =>
    JSON.parse(localStorage.getItem('loggedUser')).id === blog.user.id && (
      <button onClick={deleteBlog}>Delete</button>
    )

  return (
    <li>
      <span>
        <span>{blog.title}</span> <span>{blog.user.username}</span>
      </span>{' '}
      <Togglabe>
        <BlogDetail blog={blog} putFavorite={putFavorite} />
      </Togglabe>
      <DeleteButton />
    </li>
  )
}

export default Blog
