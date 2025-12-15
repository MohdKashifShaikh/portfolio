import { render, screen } from '@testing-library/react'
import { Container } from '../Container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies default container classes', () => {
    const { container } = render(
      <Container>
        <div>Content</div>
      </Container>
    )
    
    const containerDiv = container.firstChild
    expect(containerDiv).toHaveClass('container', 'p-8', 'mx-auto', 'xl:px-0')
  })

  it('applies additional className when provided', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Content</div>
      </Container>
    )
    
    const containerDiv = container.firstChild
    expect(containerDiv).toHaveClass('container', 'p-8', 'mx-auto', 'xl:px-0', 'custom-class')
  })

  it('works without additional className', () => {
    const { container } = render(
      <Container>
        <div>Content</div>
      </Container>
    )
    
    const containerDiv = container.firstChild
    expect(containerDiv).toHaveClass('container', 'p-8', 'mx-auto', 'xl:px-0')
  })

  it('renders multiple children', () => {
    render(
      <Container>
        <div>First child</div>
        <div>Second child</div>
      </Container>
    )
    
    expect(screen.getByText('First child')).toBeInTheDocument()
    expect(screen.getByText('Second child')).toBeInTheDocument()
  })
})