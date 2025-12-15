import { render, screen } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>)
    
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders as link when href is provided', () => {
    render(<Button href="/test">Link Button</Button>)
    
    const link = screen.getByRole('link', { name: 'Link Button' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('applies primary variant by default', () => {
    render(<Button>Primary Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn')
    expect(button).not.toHaveClass('outline')
  })

  it('applies outline variant when specified', () => {
    render(<Button variant="outline">Outline Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'outline')
  })

  it('applies dark theme class when theme is dark', () => {
    render(<Button theme="dark">Dark Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'dark')
  })

  it('combines variant and theme classes correctly', () => {
    render(<Button variant="outline" theme="dark">Combined Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'outline', 'dark')
  })

  it('renders link with correct classes when href provided', () => {
    render(<Button href="/test" variant="outline" theme="dark">Link with classes</Button>)
    
    const link = screen.getByRole('link')
    expect(link).toHaveClass('btn', 'outline', 'dark')
  })
})