import { render, screen } from '@testing-library/react'
import StaticParallax from '../StaticParallax'

describe('StaticParallax', () => {
  it('renders the main container section', () => {
    const { container } = render(<StaticParallax />)
    
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('displays the code window with proper structure', () => {
    const { container } = render(<StaticParallax />)
    
    expect(container.querySelector('.codeWindow')).toBeInTheDocument()
    expect(container.querySelector('.windowHeader')).toBeInTheDocument()
    expect(container.querySelector('.codeContent')).toBeInTheDocument()
    expect(container.querySelector('.statusBar')).toBeInTheDocument()
  })

  it('renders window controls', () => {
    const { container } = render(<StaticParallax />)
    
    const controls = container.querySelectorAll('.control')
    expect(controls).toHaveLength(3)
  })

  it('displays active and inactive tabs', () => {
    render(<StaticParallax />)
    
    expect(screen.getByText('developer.ts')).toBeInTheDocument()
    expect(screen.getByText('portfolio.tsx')).toBeInTheDocument()
  })

  it('shows branch information and status', () => {
    render(<StaticParallax />)
    
    expect(screen.getByText('🌿 main')).toBeInTheDocument()
  })

  it('renders line numbers', () => {
    const { container } = render(<StaticParallax />)
    
    const lineNumbers = container.querySelectorAll('.lineNumber')
    expect(lineNumbers.length).toBeGreaterThan(0)
    expect(lineNumbers[0]).toHaveTextContent('1')
  })

  it('displays the code snippet with developer profile', () => {
    render(<StaticParallax />)
    
    expect(screen.getByText(/Mohd Kashif Shaikh/)).toBeInTheDocument()
    expect(screen.getByText(/Senior Software Developer/)).toBeInTheDocument()
    expect(screen.getByText(/4\+ Years/)).toBeInTheDocument()
  })

  it('shows technology skills in code', () => {
    render(<StaticParallax />)
    
    expect(screen.getByText(/React/)).toBeInTheDocument()
    expect(screen.getByText(/Next\.js/)).toBeInTheDocument()
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument()
    expect(screen.getByText(/Node\.js/)).toBeInTheDocument()
  })

  it('renders status bar with file information', () => {
    render(<StaticParallax />)
    
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('UTF-8')).toBeInTheDocument()
    expect(screen.getByText('LF')).toBeInTheDocument()
    expect(screen.getByText('Ln 42, Col 2')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('displays floating geometric elements', () => {
    const { container } = render(<StaticParallax />)
    
    expect(container.querySelector('.floatingElement1')).toBeInTheDocument()
    expect(container.querySelector('.floatingElement2')).toBeInTheDocument()
    expect(container.querySelector('.floatingElement3')).toBeInTheDocument()
  })

  it('renders dynamic title section', () => {
    render(<StaticParallax />)
    
    expect(screen.getByText('Synthesizing Code')).toBeInTheDocument()
    expect(screen.getByText('Interfaces')).toBeInTheDocument()
    expect(screen.getByText(/Building tomorrow's web with precision/)).toBeInTheDocument()
  })

  it('includes developer philosophy in code', () => {
    render(<StaticParallax />)
    
    expect(screen.getByText(/Clean, scalable, and maintainable/)).toBeInTheDocument()
    expect(screen.getByText(/User-centered with attention to detail/)).toBeInTheDocument()
  })

  it('shows current focus areas', () => {
    render(<StaticParallax />)
    
    expect(screen.getByText(/Advanced React Patterns/)).toBeInTheDocument()
    expect(screen.getByText(/Performance Optimization/)).toBeInTheDocument()
    expect(screen.getByText(/3D Web Experiences/)).toBeInTheDocument()
  })

  it('has proper sticky container structure', () => {
    const { container } = render(<StaticParallax />)
    
    expect(container.querySelector('.sticky')).toBeInTheDocument()
  })
})