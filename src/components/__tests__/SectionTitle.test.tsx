import { render, screen } from '@testing-library/react'
import { SectionTitle } from '../SectionTitle'

describe('SectionTitle', () => {
  it('renders with title only', () => {
    render(<SectionTitle title="Test Title" />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders with preTitle and title', () => {
    render(<SectionTitle preTitle="Pre Title" title="Main Title" />)
    
    expect(screen.getByText('Pre Title')).toBeInTheDocument()
    expect(screen.getByText('Main Title')).toBeInTheDocument()
  })

  it('renders with all props including children', () => {
    render(
      <SectionTitle preTitle="Pre Title" title="Main Title">
        This is the description content
      </SectionTitle>
    )
    
    expect(screen.getByText('Pre Title')).toBeInTheDocument()
    expect(screen.getByText('Main Title')).toBeInTheDocument()
    expect(screen.getByText('This is the description content')).toBeInTheDocument()
  })

  it('applies center alignment by default', () => {
    const { container } = render(<SectionTitle title="Test Title" />)
    
    const wrapper = container.querySelector('.flex')
    expect(wrapper).toHaveClass('items-center', 'justify-center', 'text-center')
  })

  it('applies left alignment when specified', () => {
    const { container } = render(<SectionTitle title="Test Title" align="left" />)
    
    const wrapper = container.querySelector('.flex')
    expect(wrapper).not.toHaveClass('items-center', 'justify-center', 'text-center')
  })

  it('renders preTitle with correct styling', () => {
    render(<SectionTitle preTitle="Pre Title" />)
    
    const preTitle = screen.getByText('Pre Title')
    expect(preTitle).toHaveClass('text-sm', 'font-bold', 'tracking-wider', 'text-indigo-600', 'uppercase')
  })

  it('renders title as h2 with correct styling', () => {
    render(<SectionTitle title="Main Title" />)
    
    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveTextContent('Main Title')
    expect(title).toHaveClass('max-w-2xl', 'mt-3', 'text-3xl', 'font-bold')
  })

  it('renders children content with correct styling', () => {
    render(
      <SectionTitle title="Title">
        <span>Child content</span>
      </SectionTitle>
    )
    
    const childContent = screen.getByText('Child content')
    expect(childContent.parentElement).toHaveClass('max-w-2xl', 'py-4', 'text-lg')
  })

  it('renders without preTitle', () => {
    render(<SectionTitle title="Only Title" />)
    
    expect(screen.getByText('Only Title')).toBeInTheDocument()
    expect(screen.queryByText('Pre Title')).not.toBeInTheDocument()
  })

  it('renders without title', () => {
    render(<SectionTitle preTitle="Only Pre Title" />)
    
    expect(screen.getByText('Only Pre Title')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('renders without children', () => {
    render(<SectionTitle preTitle="Pre" title="Title" />)
    
    expect(screen.getByText('Pre')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.queryByText('p')).not.toBeInTheDocument()
  })

  it('uses Container component wrapper', () => {
    const { container } = render(<SectionTitle title="Test" />)
    
    // Container component adds these classes
    expect(container.querySelector('.container')).toBeInTheDocument()
  })
})