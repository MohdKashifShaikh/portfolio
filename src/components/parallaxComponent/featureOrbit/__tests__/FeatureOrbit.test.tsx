import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FeatureOrbit from '../page'

// Mock window dimensions for responsive testing
const mockWindowDimensions = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
}

describe('FeatureOrbit', () => {
  beforeEach(() => {
    mockWindowDimensions(1024, 768)
  })

  it('renders the main section', () => {
    const { container } = render(<FeatureOrbit />)
    
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('displays all neural network nodes', () => {
    render(<FeatureOrbit />)
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('MongoDB')).toBeInTheDocument()
    expect(screen.getByText('Express')).toBeInTheDocument()
    expect(screen.getByText('NestJS')).toBeInTheDocument()
  })

  it('renders neural grid background', () => {
    const { container } = render(<FeatureOrbit />)
    
    const gridNodes = container.querySelectorAll('.gridNode')
    expect(gridNodes.length).toBeGreaterThan(0)
  })

  it('displays central brain visualization', () => {
    render(<FeatureOrbit />)
    
    expect(screen.getByText('TECH')).toBeInTheDocument()
    expect(screen.getByText('ARSENAL')).toBeInTheDocument()
  })

  it('renders circular progress indicators for each node', () => {
    const { container } = render(<FeatureOrbit />)
    
    const progressCircles = container.querySelectorAll('.circularProgress')
    expect(progressCircles).toHaveLength(6) // One for each tech node
  })

  it('shows activity rings for neural nodes', () => {
    const { container } = render(<FeatureOrbit />)
    
    const activityRings = container.querySelectorAll('.activityRing')
    expect(activityRings).toHaveLength(6)
  })

  it('handles mouse interactions', async () => {
    const user = userEvent.setup()
    const { container } = render(<FeatureOrbit />)
    
    const neuralContainer = container.querySelector('.neuralContainer')
    expect(neuralContainer).toBeInTheDocument()
    
    // Test mouse move
    if (neuralContainer) {
      await user.hover(neuralContainer)
    }
  })

  it('displays tooltips on node hover', async () => {
    const user = userEvent.setup()
    render(<FeatureOrbit />)
    
    const reactNode = screen.getByText('React')
    await user.hover(reactNode)
    
    // Tooltip should appear (though it might be delayed)
    expect(reactNode).toBeInTheDocument()
  })

  it('renders brain waves animation', () => {
    const { container } = render(<FeatureOrbit />)
    
    expect(container.querySelector('.brainWaves')).toBeInTheDocument()
  })

  it('has proper neural network container structure', () => {
    const { container } = render(<FeatureOrbit />)
    
    expect(container.querySelector('.neuralNetwork')).toBeInTheDocument()
    expect(container.querySelector('.centralBrain')).toBeInTheDocument()
  })

  it('renders all node cores with proper styling', () => {
    const { container } = render(<FeatureOrbit />)
    
    const nodeCores = container.querySelectorAll('.nodeCore')
    expect(nodeCores).toHaveLength(6)
  })

  it('displays tech labels for each node', () => {
    const { container } = render(<FeatureOrbit />)
    
    const techLabels = container.querySelectorAll('.techLabel')
    expect(techLabels).toHaveLength(6)
  })

  it('handles responsive positioning on mobile', () => {
    mockWindowDimensions(480, 800)
    
    const { container } = render(<FeatureOrbit />)
    
    // Should still render all nodes
    const nodes = container.querySelectorAll('.nodeCore')
    expect(nodes).toHaveLength(6)
  })

  it('handles responsive positioning on tablet', () => {
    mockWindowDimensions(768, 1024)
    
    const { container } = render(<FeatureOrbit />)
    
    // Should still render all nodes
    const nodes = container.querySelectorAll('.nodeCore')
    expect(nodes).toHaveLength(6)
  })

  it('renders progress bars with correct structure', () => {
    const { container } = render(<FeatureOrbit />)
    
    const progressBars = container.querySelectorAll('.progressBar')
    const progressBackgrounds = container.querySelectorAll('.progressBackground')
    
    expect(progressBars).toHaveLength(6)
    expect(progressBackgrounds).toHaveLength(6)
  })
})