import { useState } from 'react'

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
    <section className='formSection'>
      <h3>Create a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input
            placeholder='Write the blog title'
            type='text'
            id='title'
            name='title'
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>

        <div>
          <label htmlFor='url'>Url: </label>
          <input
            placeholder='Write the url of your blog'
            type='text'
            id='url'
            name='url'
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </section>
  )
}

export default BlogForm
