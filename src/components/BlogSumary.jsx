const BlogSumary = ({blog}) => {
  return (
    <span className="blogSumary">
      <span>{blog.title}</span> <span>{blog.user.username}</span>
    </span>
  )
}
export default BlogSumary
