const BlogDetail = ({ blog }) => {
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
        <button>❤️</button>
      </p>
      <p>
        <span>Author: </span>
        {blog.user.name}
      </p>
    </section>
  )
}
export default BlogDetail
