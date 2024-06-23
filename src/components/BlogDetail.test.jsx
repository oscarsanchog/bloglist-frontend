import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglabe from './Togglabe'
import BlogDetail from './BlogDetail'
import { expect } from 'vitest'

describe('<Togglable />', () => {
  let container
  const blog = {
    title: 'Blog Title',
    url: 'Blog URL',
    likes: 4,
    user: { name: 'Óscar Sancho González' },
  }
  const mockPutFavorite = vi.fn()

  beforeEach(() => {
    container = render(
      <Togglabe>
        <BlogDetail blog={blog} putFavorite={mockPutFavorite}/>
      </Togglabe>
    ).container
  })

  test('renders View button when it is closed', async () => {
    await screen.findAllByText('View')
  })

  test('at start the children are not displayed', () => {
    const span = container.querySelector('.togglabeContent')
    expect(span).toBeNull()
  })

  test('after clicking the button, Likes and URL are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const span = container.querySelector('.togglabeContent')
    expect(span).not.toBeNull()

    expect(span).toHaveTextContent('URL:')
    expect(span).toHaveTextContent('Blog URL')
    expect(span).toHaveTextContent('Likes:')
    expect(span).toHaveTextContent(4)
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const likeButton = screen.getByText('❤️')
    await user.click(likeButton)
    await user.click(likeButton)

    // expect(mockPutFavorite.mock.calls).toHaveLength(2) // Esta es otra forma de verificarlo
    expect(mockPutFavorite).toHaveBeenCalledTimes(2)
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const closeButton = screen.getByText('Hide')
    await user.click(closeButton)

    const span = container.querySelector('.togglableContent')
    expect(span).toBeNull()
  })

  // screen.debug(container)
})
