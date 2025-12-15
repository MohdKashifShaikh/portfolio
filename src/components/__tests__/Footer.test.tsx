import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('renders footer with correct content', () => {
    render(<Footer />)
    
    expect(screen.getByText("Let's Build Something Amazing")).toBeInTheDocument()
    expect(screen.getByText(/Ready to bring your ideas to life/)).toBeInTheDocument()
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('displays current year in copyright', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} Mohd Kashif Shaikh`))).toBeInTheDocument()
  })

  it('renders all social links', () => {
    render(<Footer />)
    
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('has correct href attributes for social links', () => {
    render(<Footer />)
    
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/mohd-kashif-shaikh')
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://linkedin.com/in/mohd-kashif-shaikh')
    expect(screen.getByLabelText('Twitter')).toHaveAttribute('href', 'https://twitter.com/kashif_dev')
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', 'mailto:kashif.dev@example.com')
  })

  it('has proper external link attributes', () => {
    render(<Footer />)
    
    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('displays technology stack information', () => {
    render(<Footer />)
    
    expect(screen.getByText(/Built with/)).toBeInTheDocument()
    expect(screen.getByText(/using Next.js & TypeScript/)).toBeInTheDocument()
  })

  it('renders brand logo with correct initial', () => {
    render(<Footer />)
    
    expect(screen.getByText('K')).toBeInTheDocument()
  })
})