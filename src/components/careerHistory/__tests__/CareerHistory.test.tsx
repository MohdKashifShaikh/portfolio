import { render, screen } from '@testing-library/react'
import CareerHistory from '../page'

const mockSteps = [
  {
    role: 'Senior Frontend Developer',
    company: 'Tech Corp',
    duration: '2022 - Present',
    description: 'Leading frontend development initiatives'
  },
  {
    role: 'Frontend Developer',
    company: 'StartupXYZ',
    duration: '2020 - 2022',
    description: 'Built responsive web applications'
  },
  {
    role: 'Junior Developer',
    company: 'WebAgency',
    duration: '2018 - 2020',
    description: 'Developed client websites'
  }
]

describe('CareerHistory', () => {
  it('renders timeline container', () => {
    const { container } = render(<CareerHistory steps={mockSteps} />)
    
    expect(container.querySelector('.timelineContainer')).toBeInTheDocument()
  })

  it('renders progress line elements', () => {
    const { container } = render(<CareerHistory steps={mockSteps} />)
    
    expect(container.querySelector('.centerLine')).toBeInTheDocument()
    expect(container.querySelector('.progressFill')).toBeInTheDocument()
  })

  it('renders all career steps', () => {
    render(<CareerHistory steps={mockSteps} />)
    
    expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Junior Developer')).toBeInTheDocument()
  })

  it('displays company names', () => {
    render(<CareerHistory steps={mockSteps} />)
    
    expect(screen.getByText('Tech Corp')).toBeInTheDocument()
    expect(screen.getByText('StartupXYZ')).toBeInTheDocument()
    expect(screen.getByText('WebAgency')).toBeInTheDocument()
  })

  it('shows duration for each role', () => {
    render(<CareerHistory steps={mockSteps} />)
    
    expect(screen.getByText('2022 - Present')).toBeInTheDocument()
    expect(screen.getByText('2020 - 2022')).toBeInTheDocument()
    expect(screen.getByText('2018 - 2020')).toBeInTheDocument()
  })

  it('displays job descriptions', () => {
    render(<CareerHistory steps={mockSteps} />)
    
    expect(screen.getByText('Leading frontend development initiatives')).toBeInTheDocument()
    expect(screen.getByText('Built responsive web applications')).toBeInTheDocument()
    expect(screen.getByText('Developed client websites')).toBeInTheDocument()
  })

  it('alternates step positions (left/right)', () => {
    const { container } = render(<CareerHistory steps={mockSteps} />)
    
    const stepWrappers = container.querySelectorAll('.stepWrapper')
    expect(stepWrappers[0]).toHaveClass('left')
    expect(stepWrappers[1]).toHaveClass('right')
    expect(stepWrappers[2]).toHaveClass('left')
  })

  it('renders markers for each step', () => {
    const { container } = render(<CareerHistory steps={mockSteps} />)
    
    const markers = container.querySelectorAll('.marker')
    expect(markers).toHaveLength(3)
  })

  it('handles empty steps array', () => {
    const { container } = render(<CareerHistory steps={[]} />)
    
    expect(container.querySelector('.timelineContainer')).toBeInTheDocument()
    expect(container.querySelector('.centerLine')).toBeInTheDocument()
  })

  it('renders step content with proper structure', () => {
    const { container } = render(<CareerHistory steps={mockSteps} />)
    
    const stepContents = container.querySelectorAll('.stepContent')
    expect(stepContents).toHaveLength(3)
    
    stepContents.forEach(content => {
      expect(content.querySelector('h3')).toBeInTheDocument()
      expect(content.querySelector('.company')).toBeInTheDocument()
      expect(content.querySelector('.duration')).toBeInTheDocument()
      expect(content.querySelector('p')).toBeInTheDocument()
    })
  })
})