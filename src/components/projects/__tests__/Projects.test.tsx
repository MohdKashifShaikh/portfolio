import { render, screen } from '@testing-library/react'
import ProjectsList from '../Projects'

describe('ProjectsList', () => {
  it('renders projects section with title', () => {
    render(<ProjectsList />)
    
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders all project cards', () => {
    render(<ProjectsList />)
    
    expect(screen.getByText('SaaS Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Design System')).toBeInTheDocument()
    expect(screen.getByText('Micro-frontend Interaction')).toBeInTheDocument()
  })

  it('displays project descriptions', () => {
    render(<ProjectsList />)
    
    expect(screen.getByText(/Multi-tenant analytics dashboard/)).toBeInTheDocument()
    expect(screen.getByText(/Accessible component library/)).toBeInTheDocument()
    expect(screen.getByText(/Embeddable micro-frontend/)).toBeInTheDocument()
  })

  it('shows technology tags for each project', () => {
    render(<ProjectsList />)
    
    // SaaS Dashboard technologies
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Recharts')).toBeInTheDocument()
    
    // Design System technologies
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('SCSS Modules')).toBeInTheDocument()
    expect(screen.getByText('Storybook')).toBeInTheDocument()
    
    // Micro-frontend technologies
    expect(screen.getByText('Module Federation')).toBeInTheDocument()
    expect(screen.getByText('Webpack 5')).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<ProjectsList />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('id', 'projects')
    expect(section).toHaveClass('section')
  })

  it('renders projects in a grid layout', () => {
    const { container } = render(<ProjectsList />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
  })

  it('renders correct number of projects', () => {
    render(<ProjectsList />)
    
    const projectTitles = screen.getAllByRole('heading', { level: 3 })
    expect(projectTitles).toHaveLength(3)
  })
})