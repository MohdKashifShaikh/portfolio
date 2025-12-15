import { render, screen } from '@testing-library/react'
import { Benefits } from '../Benefits'

const mockData = {
  title: 'Test Benefits Title',
  desc: 'Test benefits description',
  image: {
    src: '/test-image.jpg',
    width: 521,
    height: 521,
  },
  bullets: [
    {
      title: 'First Benefit',
      desc: 'Description of first benefit',
      icon: <svg data-testid="icon-1"><path /></svg>,
    },
    {
      title: 'Second Benefit',
      desc: 'Description of second benefit',
      icon: <svg data-testid="icon-2"><path /></svg>,
    },
  ],
}

describe('Benefits', () => {
  it('renders with provided data', () => {
    render(<Benefits data={mockData} />)
    
    expect(screen.getByText('Test Benefits Title')).toBeInTheDocument()
    expect(screen.getByText('Test benefits description')).toBeInTheDocument()
  })

  it('renders all benefit items', () => {
    render(<Benefits data={mockData} />)
    
    expect(screen.getByText('First Benefit')).toBeInTheDocument()
    expect(screen.getByText('Description of first benefit')).toBeInTheDocument()
    expect(screen.getByText('Second Benefit')).toBeInTheDocument()
    expect(screen.getByText('Description of second benefit')).toBeInTheDocument()
  })

  it('renders benefit icons', () => {
    render(<Benefits data={mockData} />)
    
    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
    expect(screen.getByTestId('icon-2')).toBeInTheDocument()
  })

  it('renders image with correct attributes', () => {
    render(<Benefits data={mockData} />)
    
    const image = screen.getByAltText('Benefits')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('width', '521')
    expect(image).toHaveAttribute('height', '521')
  })

  it('applies left positioning by default', () => {
    const { container } = render(<Benefits data={mockData} />)
    
    const imageContainer = container.querySelector('.lg\\:order-1')
    expect(imageContainer).not.toBeInTheDocument()
  })

  it('applies right positioning when imgPos is right', () => {
    const { container } = render(<Benefits data={mockData} imgPos="right" />)
    
    const imageContainer = container.querySelector('.lg\\:order-1')
    expect(imageContainer).toBeInTheDocument()
  })

  it('renders title as h3', () => {
    render(<Benefits data={mockData} />)
    
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toHaveTextContent('Test Benefits Title')
  })

  it('renders benefit titles as h4', () => {
    render(<Benefits data={mockData} />)
    
    const benefitTitles = screen.getAllByRole('heading', { level: 4 })
    expect(benefitTitles).toHaveLength(2)
    expect(benefitTitles[0]).toHaveTextContent('First Benefit')
    expect(benefitTitles[1]).toHaveTextContent('Second Benefit')
  })

  it('applies proper styling to benefit icons', () => {
    const { container } = render(<Benefits data={mockData} />)
    
    const iconContainers = container.querySelectorAll('.bg-indigo-500')
    expect(iconContainers).toHaveLength(2)
  })

  it('handles empty bullets array', () => {
    const dataWithNoBullets = { ...mockData, bullets: [] }
    
    expect(() => render(<Benefits data={dataWithNoBullets} />)).not.toThrow()
  })
})