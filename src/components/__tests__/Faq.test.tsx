import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Faq } from '../Faq'

describe('Faq', () => {
  it('renders all FAQ questions', () => {
    render(<Faq />)
    
    expect(screen.getByText('Is this template completely free to use?')).toBeInTheDocument()
    expect(screen.getByText('Can I use it in a commercial project?')).toBeInTheDocument()
    expect(screen.getByText('What is your refund policy?')).toBeInTheDocument()
    expect(screen.getByText('Do you offer technical support?')).toBeInTheDocument()
  })

  it('initially hides all answers', () => {
    render(<Faq />)
    
    expect(screen.queryByText('Yes, this template is completely free to use.')).not.toBeVisible()
    expect(screen.queryByText('Yes, this you can.')).not.toBeVisible()
  })

  it('expands FAQ item when clicked', async () => {
    const user = userEvent.setup()
    render(<Faq />)
    
    const firstQuestion = screen.getByText('Is this template completely free to use?')
    await user.click(firstQuestion)
    
    expect(screen.getByText('Yes, this template is completely free to use.')).toBeVisible()
  })

  it('collapses FAQ item when clicked again', async () => {
    const user = userEvent.setup()
    render(<Faq />)
    
    const firstQuestion = screen.getByText('Is this template completely free to use?')
    
    // Expand
    await user.click(firstQuestion)
    expect(screen.getByText('Yes, this template is completely free to use.')).toBeVisible()
    
    // Collapse
    await user.click(firstQuestion)
    expect(screen.queryByText('Yes, this template is completely free to use.')).not.toBeVisible()
  })

  it('renders chevron icons', () => {
    const { container } = render(<Faq />)
    
    const chevronIcons = container.querySelectorAll('svg')
    expect(chevronIcons.length).toBeGreaterThan(0)
  })

  it('rotates chevron when expanded', async () => {
    const user = userEvent.setup()
    const { container } = render(<Faq />)
    
    const firstQuestion = screen.getByText('Is this template completely free to use?')
    const chevron = container.querySelector('svg')
    
    // Initially not rotated
    expect(chevron).not.toHaveClass('rotate-180')
    
    // Click to expand
    await user.click(firstQuestion)
    
    // Should be rotated after expansion
    expect(chevron).toHaveClass('rotate-180')
  })

  it('handles multiple FAQ items independently', async () => {
    const user = userEvent.setup()
    render(<Faq />)
    
    const firstQuestion = screen.getByText('Is this template completely free to use?')
    const secondQuestion = screen.getByText('Can I use it in a commercial project?')
    
    // Expand first
    await user.click(firstQuestion)
    expect(screen.getByText('Yes, this template is completely free to use.')).toBeVisible()
    
    // Expand second
    await user.click(secondQuestion)
    expect(screen.getByText('Yes, this you can.')).toBeVisible()
    
    // Both should be visible
    expect(screen.getByText('Yes, this template is completely free to use.')).toBeVisible()
    expect(screen.getByText('Yes, this you can.')).toBeVisible()
  })

  it('renders proper button structure', () => {
    render(<Faq />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(4) // One for each FAQ item
  })

  it('has proper accessibility attributes', () => {
    render(<Faq />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveClass('focus:outline-none')
    })
  })

  it('uses Container component', () => {
    const { container } = render(<Faq />)
    
    expect(container.querySelector('.container')).toBeInTheDocument()
  })
})