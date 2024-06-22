import { useState } from "react"

const BlogForm = ({ postBlog }) => {
  const emptyForm = { title: '', url: '' }
  const [newBlog, setNewBlog] = useState(emptyForm)

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.id]: event.target.value,
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    postBlog(newBlog)
    setNewBlog(emptyForm)
  }
  
  return (
  <form onSubmit={addBlog}>
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
)}

export default BlogForm
