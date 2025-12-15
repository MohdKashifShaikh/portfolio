import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '../Navbar'

describe('Navbar', () => {
  it('renders navbar with logo', () => {
    render(<Navbar />)
    
    const logo = screen.getByAltText('name')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/images/kashif.png')
  })

  it('renders navigation menu items', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    render(<Navbar />)
    
    const aboutLink = screen.getByRole('link', { name: 'About' })
    expect(aboutLink).toHaveAttribute('href', '#about')
  })

  it('renders theme changer component', () => {
    render(<Navbar />)
    
    // Theme changer should be present (mocked in setup)
    expect(document.querySelector('.nav__item')).toBeInTheDocument()
  })

  it('renders mobile menu toggle button', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Toggle Menu')
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Toggle Menu')
    
    // Initially closed
    expect(screen.queryByText('Get Started')).not.toBeInTheDocument()
    
    // Click to open
    await user.click(menuButton)
    
    // Should show mobile menu items
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('renders logo link to home', () => {
    render(<Navbar />)
    
    const logoLink = screen.getByRole('link', { name: /kashif/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('has proper responsive classes', () => {
    render(<Navbar />)
    
    const nav = document.querySelector('nav')
    expect(nav).toHaveClass('flex', 'flex-wrap', 'items-center', 'justify-between')
  })

  it('renders desktop navigation menu', () => {
    render(<Navbar />)
    
    const desktopMenu = document.querySelector('.hidden.text-center.lg\\:flex')
    expect(desktopMenu).toBeInTheDocument()
  })
})