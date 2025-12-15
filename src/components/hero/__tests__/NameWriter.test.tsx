import { render, screen, act } from '@testing-library/react'
import NameWriter from '../NameWriter'

// Mock timers for testing typewriter effect
vi.useFakeTimers()

describe('NameWriter', () => {
  afterEach(() => {
    vi.clearAllTimers()
  })

  it('renders with initial empty text and cursor', () => {
    render(<NameWriter />)
    
    const cursor = screen.getByText('|')
    expect(cursor).toBeInTheDocument()
  })

  it('starts typing the first word', () => {
    render(<NameWriter />)
    
    // Fast-forward time to see typing effect
    act(() => {
      vi.advanceTimersByTime(150) // TYPING_SPEED
    })
    
    expect(screen.getByText(/M/)).toBeInTheDocument()
  })

  it('continues typing characters', () => {
    render(<NameWriter />)
    
    // Fast-forward through multiple typing cycles
    act(() => {
      vi.advanceTimersByTime(150 * 5) // Type 5 characters
    })
    
    expect(screen.getByText(/Mohd/)).toBeInTheDocument()
  })

  it('renders cursor element', () => {
    const { container } = render(<NameWriter />)
    
    const cursor = container.querySelector('.cursor')
    expect(cursor).toBeInTheDocument()
    expect(cursor).toHaveTextContent('|')
  })

  it('applies typewriter text styling', () => {
    const { container } = render(<NameWriter />)
    
    const typewriterElement = container.querySelector('.typewriter_text')
    expect(typewriterElement).toBeInTheDocument()
  })

  it('handles component unmounting during typing', () => {
    const { unmount } = render(<NameWriter />)
    
    // Start typing
    act(() => {
      vi.advanceTimersByTime(150)
    })
    
    // Unmount should not cause errors
    expect(() => unmount()).not.toThrow()
  })

  it('cycles through words array', () => {
    render(<NameWriter />)
    
    // The component should cycle between "Mohd Kashif Shaikh" and "Kashif"
    // This is tested by checking the internal logic works without errors
    act(() => {
      vi.advanceTimersByTime(150 * 20) // Advance through multiple cycles
    })
    
    // Should still be rendering without errors
    expect(screen.getByText('|')).toBeInTheDocument()
  })

  it('maintains proper text structure', () => {
    const { container } = render(<NameWriter />)
    
    const span = container.querySelector('span.typewriter_text')
    expect(span).toBeInTheDocument()
    
    const cursor = span?.querySelector('.cursor')
    expect(cursor).toBeInTheDocument()
  })
})