const BlogDetail = ({ blog, putFavorite }) => {
  const addFavorite = () => {
      putFavorite(blog.id, { likes: blog.likes + 1 })
  }

  return (
    <section>
      <h3>{blog.title}</h3>
      <p>
        <span>URL: </span>
        {blog.url}
      </p>
      <p>
        <span>Likes: </span>
        <span>{blog.likes} </span>
        <button onClick={addFavorite}>❤️</button>
      </p>
      <p>
        <span>Author: </span>
        {blog.user.name}
      </p>
    </section>
  )
}
export default BlogDetail
