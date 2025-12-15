import { render, screen } from '@testing-library/react'
import Card from '../Card'
import { describe, it } from 'node:test'

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <h3>Test Title</h3>
        <p>Test content</p>
      </Card>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies card styles', () => {
    const { container } = render(
      <Card>
        <div>Content</div>
      </Card>
    )
    
    const cardElement = container.firstChild
    expect(cardElement).toHaveClass('card')
  })

  it('renders multiple children', () => {
    render(
      <Card>
        <div>First child</div>
        <div>Second child</div>
        <span>Third child</span>
      </Card>
    )
    
    expect(screen.getByText('First child')).toBeInTheDocument()
    expect(screen.getByText('Second child')).toBeInTheDocument()
    expect(screen.getByText('Third child')).toBeInTheDocument()
  })

  it('renders as a div element', () => {
    const { container } = render(
      <Card>
        <div>Content</div>
      </Card>
    )
    
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('handles empty children', () => {
    const { container } = render(<Card>{null}</Card>)
    
    const cardElement = container.firstChild
    expect(cardElement).toBeInTheDocument()
    expect(cardElement).toHaveClass('card')
  })
})