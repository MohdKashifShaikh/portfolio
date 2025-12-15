/**
 * Test Runner Configuration
 * 
 * This file provides utilities for running and organizing tests
 * across the entire component library.
 */

export const testSuites = {
  // Core UI Components
  ui: [
    'src/components/ui/__tests__/Button.test.tsx',
  ],
  
  // Layout Components
  layout: [
    'src/components/__tests__/Container.test.tsx',
    'src/components/__tests__/Footer.test.tsx',
    'src/components/navbar/__tests__/Navbar.test.tsx',
  ],
  
  // Feature Components
  features: [
    'src/components/hero/__tests__/Hero.test.tsx',
    'src/components/hero/__tests__/NameWriter.test.tsx',
    'src/components/hero/__tests__/FloatingSpheres.test.tsx',
    'src/components/about/__tests__/About.test.tsx',
    'src/components/projects/__tests__/Projects.test.tsx',
    'src/components/contact/__tests__/Contact.test.tsx',
    'src/components/careerHistory/__tests__/CareerHistory.test.tsx',
  ],
  
  // Parallax Components
  parallax: [
    'src/components/parallaxComponent/StaticParallax/__tests__/StaticParallax.test.tsx',
    'src/components/parallaxComponent/featureOrbit/__tests__/FeatureOrbit.test.tsx',
  ],
  
  // Utility Components
  utilities: [
    'src/components/__tests__/DarkSwitch.test.tsx',
    'src/components/__tests__/SectionTitle.test.tsx',
    'src/components/cards/__tests__/Card.test.tsx',
  ],
  
  // Content Components
  content: [
    'src/components/__tests__/Benefits.test.tsx',
    'src/components/__tests__/Cta.test.tsx',
    'src/components/__tests__/Faq.test.tsx',
    'src/components/__tests__/Testimonials.test.tsx',
  ],
}

export const getAllTestFiles = (): string[] => {
  return Object.values(testSuites).flat()
}

export const getTestSuiteNames = (): string[] => {
  return Object.keys(testSuites)
}

export const getTestsByCategory = (category: keyof typeof testSuites): string[] => {
  return testSuites[category] || []
}