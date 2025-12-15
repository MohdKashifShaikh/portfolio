import { render, screen } from '@testing-library/react'
import { Cta } from '../Cta'

describe('Cta', () => {
  it('renders the main heading', () => {
    render(<Cta />)
    
    expect(screen.getByText('Ready to try-out this template?')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Cta />)
    
    expect(screen.getByText("Don't let your visitors see a poor landing.")).toBeInTheDocument()
  })

  it('renders the download button', () => {
    render(<Cta />)
    
    const downloadButton = screen.getByRole('link', { name: 'Download for Free' })
    expect(downloadButton).toBeInTheDocument()
  })

  it('has correct link attributes', () => {
    render(<Cta />)
    
    const downloadButton = screen.getByRole('link', { name: 'Download for Free' })
    expect(downloadButton).toHaveAttribute('href', 'https://github.com/web3templates')
    expect(downloadButton).toHaveAttribute('target', '_blank')
    expect(downloadButton).toHaveAttribute('rel', 'noopener')
  })

  it('renders heading as h2', () => {
    render(<Cta />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Ready to try-out this template?')
  })

  it('applies proper styling classes', () => {
    const { container } = render(<Cta />)
    
    const ctaContainer = container.querySelector('.bg-indigo-600')
    expect(ctaContainer).toBeInTheDocument()
    expect(ctaContainer).toHaveClass('text-white', 'rounded-xl')
  })

  it('has responsive layout classes', () => {
    const { container } = render(<Cta />)
    
    const ctaContainer = container.querySelector('.flex-wrap')
    expect(ctaContainer).toBeInTheDocument()
    expect(ctaContainer).toHaveClass('lg:flex-nowrap')
  })

  it('button has proper styling', () => {
    render(<Cta />)
    
    const button = screen.getByRole('link', { name: 'Download for Free' })
    expect(button).toHaveClass('bg-white', 'text-indigo-600', 'rounded-md')
  })

  it('uses Container component', () => {
    const { container } = render(<Cta />)
    
    expect(container.querySelector('.container')).toBeInTheDocument()
  })
})