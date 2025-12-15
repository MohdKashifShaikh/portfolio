import { render, screen } from '@testing-library/react'
import { Testimonials } from '../Testimonials'

describe('Testimonials', () => {
  it('renders all testimonial content', () => {
    render(<Testimonials />)
    
    expect(screen.getByText(/Share a real/)).toBeInTheDocument()
    expect(screen.getByText(/Make sure you only pick the/)).toBeInTheDocument()
    expect(screen.getByText(/This is an/)).toBeInTheDocument()
  })

  it('renders all customer names', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('Sarah Steiner')).toBeInTheDocument()
    expect(screen.getByText('Dylan Ambrose')).toBeInTheDocument()
    expect(screen.getByText('Gabrielle Winn')).toBeInTheDocument()
  })

  it('renders all customer titles', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('VP Sales at Google')).toBeInTheDocument()
    expect(screen.getByText('Lead marketer at Netflix')).toBeInTheDocument()
    expect(screen.getByText('Co-founder of Acme Inc')).toBeInTheDocument()
  })

  it('renders customer avatars', () => {
    render(<Testimonials />)
    
    const avatars = screen.getAllByAltText('Avatar')
    expect(avatars).toHaveLength(3)
  })

  it('highlights key words with Mark component', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('testimonial')).toBeInTheDocument()
    expect(screen.getByText('right sentence')).toBeInTheDocument()
    expect(screen.getByText('awesome')).toBeInTheDocument()
  })

  it('applies proper grid layout', () => {
    const { container } = render(<Testimonials />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('lg:grid-cols-2', 'xl:grid-cols-3')
  })

  it('applies proper testimonial card styling', () => {
    const { container } = render(<Testimonials />)
    
    const cards = container.querySelectorAll('.bg-gray-100')
    expect(cards).toHaveLength(3)
    
    cards.forEach(card => {
      expect(card).toHaveClass('rounded-2xl', 'dark:bg-trueGray-800')
    })
  })

  it('renders avatar images with correct dimensions', () => {
    render(<Testimonials />)
    
    const avatars = screen.getAllByAltText('Avatar')
    avatars.forEach(avatar => {
      expect(avatar).toHaveAttribute('width', '40')
      expect(avatar).toHaveAttribute('height', '40')
    })
  })

  it('applies mark styling correctly', () => {
    const { container } = render(<Testimonials />)
    
    const marks = container.querySelectorAll('mark')
    expect(marks.length).toBeGreaterThan(0)
    
    marks.forEach(mark => {
      expect(mark).toHaveClass('text-indigo-800', 'bg-indigo-100', 'rounded-md')
    })
  })

  it('has proper responsive column spans', () => {
    const { container } = render(<Testimonials />)
    
    const firstCard = container.querySelector('.lg\\:col-span-2')
    expect(firstCard).toBeInTheDocument()
    expect(firstCard).toHaveClass('xl:col-auto')
  })

  it('uses Container component', () => {
    const { container } = render(<Testimonials />)
    
    expect(container.querySelector('.container')).toBeInTheDocument()
  })

  it('renders proper avatar structure', () => {
    const { container } = render(<Testimonials />)
    
    const avatarContainers = container.querySelectorAll('.flex-shrink-0.overflow-hidden.rounded-full')
    expect(avatarContainers).toHaveLength(3)
  })
})