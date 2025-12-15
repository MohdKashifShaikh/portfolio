import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

// Mock Canvas component from R3F
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div data-testid="r3f-canvas">{children}</div>
}))

describe('Hero', () => {
  beforeEach(() => {
    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      fillStyle: '',
      clearRect: vi.fn(),
      fillRect: vi.fn(),
    })) as any
  })

  it('renders hero section with main content', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument()
    expect(screen.getByText(/Senior Frontend Developer/)).toBeInTheDocument()
    expect(screen.getByText('See Projects')).toBeInTheDocument()
    expect(screen.getByText('View Github')).toBeInTheDocument()
  })

  it('renders canvas for starfield background', () => {
    render(<Hero />)
    
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('renders R3F canvas for 3D content', () => {
    render(<Hero />)
    
    expect(screen.getByTestId('r3f-canvas')).toBeInTheDocument()
  })

  it('has correct button links', () => {
    render(<Hero />)
    
    const projectsButton = screen.getByText('See Projects')
    const githubButton = screen.getByText('View Github')
    
    expect(projectsButton.closest('a')).toHaveAttribute('href', '/projects')
    expect(githubButton.closest('a')).toHaveAttribute('href', 'https://github.com/MohdKashifShaikh')
  })

  it('renders hero image', () => {
    render(<Hero />)
    
    const heroImage = screen.getByAltText('Hero')
    expect(heroImage).toBeInTheDocument()
    expect(heroImage).toHaveAttribute('width', '420')
    expect(heroImage).toHaveAttribute('height', '420')
  })

  it('displays professional description', () => {
    render(<Hero />)
    
    expect(screen.getByText(/building fast, accessible and delightful UI experiences/)).toBeInTheDocument()
  })

  it('renders GitHub icon in button', () => {
    render(<Hero />)
    
    const githubIcon = document.querySelector('svg[role="img"]')
    expect(githubIcon).toBeInTheDocument()
  })
})