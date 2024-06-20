import Blog from './Blog'

const Blogs = ({ blogs, putFavorite, deleteOneBlog }) => (
  <ul>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} deleteOneBlog={deleteOneBlog} putFavorite={putFavorite} />
    ))}
  </ul>
)

export default Blogs
