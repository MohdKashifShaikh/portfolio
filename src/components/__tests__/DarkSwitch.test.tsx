import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useTheme } from 'next-themes'
import ThemeChanger from '../DarkSwitch'

// Mock next-themes
const mockSetTheme = vi.fn()
vi.mocked(useTheme).mockReturnValue({
  theme: 'dark',
  setTheme: mockSetTheme,
  resolvedTheme: 'dark',
  themes: ['light', 'dark'],
  systemTheme: 'dark',
  forcedTheme: undefined,
})

describe('ThemeChanger', () => {
  beforeEach(() => {
    mockSetTheme.mockClear()
  })

  it('renders light mode button when theme is dark', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
      forcedTheme: undefined,
    })

    render(<ThemeChanger />)
    
    expect(screen.getByLabelText('Light Mode')).toBeInTheDocument()
  })

  it('renders dark mode button when theme is light', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
      forcedTheme: undefined,
    })

    render(<ThemeChanger />)
    
    expect(screen.getByLabelText('Dark Mode')).toBeInTheDocument()
  })

  it('switches to light theme when dark mode button is clicked', async () => {
    const user = userEvent.setup()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
      forcedTheme: undefined,
    })

    render(<ThemeChanger />)
    
    const lightModeButton = screen.getByLabelText('Light Mode')
    await user.click(lightModeButton)
    
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('switches to dark theme when light mode button is clicked', async () => {
    const user = userEvent.setup()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
      forcedTheme: undefined,
    })

    render(<ThemeChanger />)
    
    const darkModeButton = screen.getByLabelText('Dark Mode')
    await user.click(darkModeButton)
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('has proper accessibility attributes', () => {
    render(<ThemeChanger />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-full', 'outline-none', 'focus:outline-none')
  })

  it('renders correct SVG icons', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
      forcedTheme: undefined,
    })

    render(<ThemeChanger />)
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('w-5', 'h-5')
  })
})