import { render, screen } from '@testing-library/react'
import Contact from '../Contact'

describe('Contact', () => {
  it('renders contact section with title', () => {
    render(<Contact />)
    
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('displays contact description', () => {
    render(<Contact />)
    
    expect(screen.getByText(/If you'd like to collaborate, feel free to email me/)).toBeInTheDocument()
  })

  it('renders email link with correct href', () => {
    render(<Contact />)
    
    const emailLink = screen.getByRole('link', { name: 'Email Me' })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:kashif@example.com')
  })

  it('has proper section structure', () => {
    render(<Contact />)
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'contact')
  })

  it('applies contact styles', () => {
    const { container } = render(<Contact />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('contact')
  })

  it('email button has proper styling', () => {
    render(<Contact />)
    
    const emailButton = screen.getByRole('link', { name: 'Email Me' })
    expect(emailButton).toHaveClass('btn')
  })

  it('renders heading as h2', () => {
    render(<Contact />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Contact')
  })
})