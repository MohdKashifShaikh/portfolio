import { render, screen } from '@testing-library/react'
import About from '../About'

describe('About', () => {
  it('renders about section with title', () => {
    render(<About />)
    
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('displays professional description', () => {
    render(<About />)
    
    expect(screen.getByText(/I'm a developer blending creativity, engineering, and design/)).toBeInTheDocument()
    expect(screen.getByText(/I focus on smooth animations, immersive scroll interactions/)).toBeInTheDocument()
  })

  it('renders about image', () => {
    render(<About />)
    
    const aboutImage = screen.getByAltText('Hero')
    expect(aboutImage).toBeInTheDocument()
    expect(aboutImage).toHaveAttribute('width', '420')
    expect(aboutImage).toHaveAttribute('height', '420')
  })

  it('has proper section structure', () => {
    render(<About />)
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('contains image wrapper and content divs', () => {
    const { container } = render(<About />)
    
    expect(container.querySelector('.imageWrapper')).toBeInTheDocument()
    expect(container.querySelector('.content')).toBeInTheDocument()
  })

  it('displays key skills and focus areas', () => {
    render(<About />)
    
    expect(screen.getByText(/high-end digital experiences/)).toBeInTheDocument()
    expect(screen.getByText(/interfaces that feel premium/)).toBeInTheDocument()
  })
})