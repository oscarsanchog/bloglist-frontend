import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'

test('<BlogForm /> updates parent state and calls once onSubmit', async () => {
  const postBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm postBlog={postBlog} />)

  const titleInput = screen.getByLabelText(/title/i);
  const urlInput = screen.getByLabelText(/url/i);
  //const sendButton = screen.getByRole('button', { name: /create/i }) // buscará la palabra create no sensible a mayusculas (Create o CREATE o create)
  const sendButton = screen.getByText('Create')

  await user.type(titleInput, 'Blog title')
  await user.type(urlInput, 'blog url')
  await user.click(sendButton)

  /* Otra forma:
  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...') 
  */

  expect(postBlog).toHaveBeenCalledTimes(1)
  expect(postBlog).toHaveBeenCalledWith(
    expect.objectContaining({ title: 'Blog title', url: 'blog url' })
  )
})
