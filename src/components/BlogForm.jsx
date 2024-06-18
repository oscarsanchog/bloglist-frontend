const BlogForm = ({ postBlog, newBlog, handleBlogChange }) => (
  <form onSubmit={postBlog}>
    <div>
      <label htmlFor='title'>Title: </label>
      <input type='text' id="title" value={newBlog.title} onChange={handleBlogChange} />
    </div>

    <div>
      <label htmlFor='url'>Url: </label>
      <input type='text' id="url" value={newBlog.url} onChange={handleBlogChange} />
    </div>
    <button type="submit">Create</button>
  </form>
)

export default BlogForm
