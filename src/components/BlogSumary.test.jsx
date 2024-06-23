import { render, screen } from '@testing-library/react'
import BlogSumary from './BlogSumary'

test('renders content', () => {
  const blog = {
    title: 'Blog title',
    user: { username: 'oscarsanchog'}
  }

  /* render(<BlogSumary blog={blog} />)
  const element = screen.getByText('Blog title')
  screen.debug(element)
  expect(element).toBeDefined() */

  const { container } = render(<BlogSumary blog={blog}/>)

  const span = container.querySelector('.blogSumary')
  expect(span).toHaveTextContent('Blog title')
})
