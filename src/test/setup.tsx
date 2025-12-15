// <reference types="vitest" />
// <reference types="vitest/globals" />

import React from "react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

/* -------------------------------------------------------------------------- */
/*                              Global DOM APIs                               */
/* -------------------------------------------------------------------------- */

if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {}

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
}

globalThis.IntersectionObserver = MockIntersectionObserver
// globalThis.IntersectionObserver = vi.fn(() => ({
//   observe: vi.fn(),
//   unobserve: vi.fn(),
//   disconnect: vi.fn(),
// }));

// globalThis.ResizeObserver = vi.fn(() => ({
//   observe: vi.fn(),
//   unobserve: vi.fn(),
//   disconnect: vi.fn(),
// }));

// globalThis.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16));
// globalThis.cancelAnimationFrame = vi.fn();

/* -------------------------------------------------------------------------- */
/*                               Next.js Router                               */
/* -------------------------------------------------------------------------- */

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  pathname: "/",
  route: "/",
  query: {},
  asPath: "/",
};

// Pages Router
vi.mock("next/router", () => ({
  useRouter: () => mockRouter,
}));

// App Router
vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

/* -------------------------------------------------------------------------- */
/*                               Next.js Components                           */
/* -------------------------------------------------------------------------- */

vi.mock("next/image", () => ({
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...rest} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

/* -------------------------------------------------------------------------- */
/*                                   GSAP                                     */
/* -------------------------------------------------------------------------- */

vi.mock("gsap", () => {
  const gsap = {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    timeline: vi.fn(() => ({
      fromTo: vi.fn(),
      to: vi.fn(),
      from: vi.fn(),
      set: vi.fn(),
    })),
    fromTo: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    set: vi.fn(),
  };

  return {
    default: gsap,
    gsap,
    ScrollTrigger: {
      create: vi.fn(),
      refresh: vi.fn(),
      update: vi.fn(),
    },
  };
});

vi.mock("@gsap/react", () => ({
  useGSAP: vi.fn(),
}));

/* -------------------------------------------------------------------------- */
/*                             React Three Fiber                               */
/* -------------------------------------------------------------------------- */

vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="r3f-canvas">{children}</div>,
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({
    camera: { position: { set: vi.fn() } },
    scene: {},
  })),
}));

vi.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Stars: () => <div data-testid="stars" />,
  Sphere: () => <div data-testid="sphere" />,
  Box: () => <div data-testid="box" />,
}));

vi.mock("three", () => ({
  Vector3: vi.fn(() => ({
    set: vi.fn(),
    normalize: vi.fn(),
    multiplyScalar: vi.fn(),
  })),
  Color: vi.fn(),
  BufferGeometry: vi.fn(),
  BufferAttribute: vi.fn(),
  Points: vi.fn(),
  PointsMaterial: vi.fn(),
  Mesh: vi.fn(),
  SphereGeometry: vi.fn(),
  MeshBasicMaterial: vi.fn(),
}));

/* -------------------------------------------------------------------------- */
/*                               Framer Motion                                */
/* -------------------------------------------------------------------------- */

vi.mock("framer-motion", () => ({
  motion: {
    div: (props: any) => <div {...props} />,
    section: (props: any) => <section {...props} />,
    h1: (props: any) => <h1 {...props} />,
    p: (props: any) => <p {...props} />,
    span: (props: any) => <span {...props} />,
  },
  useScroll: vi.fn(() => ({
    scrollYProgress: { get: () => 0 },
  })),
  useTransform: vi.fn(() => ({
    get: () => 0,
  })),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

/* -------------------------------------------------------------------------- */
/*                                   Lenis                                    */
/* -------------------------------------------------------------------------- */

vi.mock("lenis", () => ({
  default: vi.fn(() => ({
    on: vi.fn(),
    off: vi.fn(),
    raf: vi.fn(),
    scrollTo: vi.fn(),
    destroy: vi.fn(),
  })),
}));

/* -------------------------------------------------------------------------- */
/*                                next-themes                                 */
/* -------------------------------------------------------------------------- */

vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    theme: "dark",
    setTheme: vi.fn(),
    resolvedTheme: "dark",
  })),
  ThemeProvider: ({ children }: any) => <>{children}</>,
}));

/* -------------------------------------------------------------------------- */
/*                               Headless UI                                  */
/* -------------------------------------------------------------------------- */

vi.mock("@headlessui/react", () => ({
  Disclosure: {
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    Panel: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// import '@testing-library/jest-dom'
// import { vi } from "vitest";

// // Mock Next.js router
// const mockRouter = {
//   push: vi.fn(),
//   replace: vi.fn(),
//   prefetch: vi.fn(),
//   back: vi.fn(),
//   forward: vi.fn(),
//   refresh: vi.fn(),
//   pathname: '/',
//   route: '/',
//   query: {},
//   asPath: '/',
// }

// vi.mock('next/router', () => ({
//   useRouter: () => mockRouter,
// }))

// // Mock Next.js navigation
// vi.mock('next/navigation', () => ({
//   useRouter: () => mockRouter,
//   usePathname: () => '/',
//   useSearchParams: () => new URLSearchParams(),
// }))

// // Mock Next.js Image component
// vi.mock('next/image', () => ({
//   default: ({ src, alt, ...props }: any) => {
//     // eslint-disable-next-line @next/next/no-img-element
//     return <img src={src} alt={alt} {...props} />
//   },
// }))

// // Mock Next.js Link component
// vi.mock('next/link', () => ({
//   default: ({ children, href, ...props }: any) => {
//     return <a href={href} {...props}>{children}</a>
//   },
// }))

// // Mock GSAP
// vi.mock('gsap', () => ({
//   default: {
//     registerPlugin: vi.fn(),
//     context: vi.fn(() => ({
//       revert: vi.fn(),
//     })),
//     timeline: vi.fn(() => ({
//       fromTo: vi.fn(),
//       to: vi.fn(),
//       from: vi.fn(),
//       set: vi.fn(),
//     })),
//     fromTo: vi.fn(),
//     to: vi.fn(),
//     from: vi.fn(),
//     set: vi.fn(),
//   },
//   ScrollTrigger: {
//     create: vi.fn(),
//     refresh: vi.fn(),
//     update: vi.fn(),
//   },
// }))

// // Mock @gsap/react
// vi.mock('@gsap/react', () => ({
//   useGSAP: vi.fn(),
// }))

// // Mock React Three Fiber
// vi.mock('@react-three/fiber', () => ({
//   Canvas: ({ children }: any) => <div data-testid="r3f-canvas">{children}</div>,
//   useFrame: vi.fn(),
//   useThree: vi.fn(() => ({
//     camera: { position: { set: vi.fn() } },
//     scene: {},
//   })),
// }))

// // Mock React Three Drei
// vi.mock('@react-three/drei', () => ({
//   OrbitControls: () => <div data-testid="orbit-controls" />,
//   Stars: () => <div data-testid="stars" />,
//   Sphere: () => <div data-testid="sphere" />,
//   Box: () => <div data-testid="box" />,
// }))

// // Mock Three.js
// vi.mock('three', () => ({
//   Vector3: vi.fn(() => ({
//     set: vi.fn(),
//     normalize: vi.fn(),
//     multiplyScalar: vi.fn(),
//   })),
//   Color: vi.fn(),
//   BufferGeometry: vi.fn(),
//   BufferAttribute: vi.fn(),
//   Points: vi.fn(),
//   PointsMaterial: vi.fn(),
//   Mesh: vi.fn(),
//   SphereGeometry: vi.fn(),
//   MeshBasicMaterial: vi.fn(),
// }))

// // Mock Framer Motion
// vi.mock('framer-motion', () => ({
//   motion: {
//     div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//     section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
//     h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
//     p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
//     span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
//   },
//   useScroll: vi.fn(() => ({ scrollYProgress: { get: () => 0 } })),
//   useTransform: vi.fn(() => ({ get: () => 0 })),
//   AnimatePresence: ({ children }: any) => children,
// }))

// // Mock Lenis
// vi.mock('lenis', () => ({
//   default: vi.fn(() => ({
//     on: vi.fn(),
//     off: vi.fn(),
//     raf: vi.fn(),
//     scrollTo: vi.fn(),
//     destroy: vi.fn(),
//   })),
// }))

// // Mock next-themes
// vi.mock('next-themes', () => ({
//   useTheme: vi.fn(() => ({
//     theme: 'dark',
//     setTheme: vi.fn(),
//     resolvedTheme: 'dark',
//   })),
//   ThemeProvider: ({ children }: any) => children,
// }))

// // Mock Headless UI
// vi.mock('@headlessui/react', () => ({
//   Disclosure: {
//     Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
//     Panel: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//   },
// }))

// // Mock window.matchMedia
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: vi.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: vi.fn(),
//     removeListener: vi.fn(),
//     addEventListener: vi.fn(),
//     removeEventListener: vi.fn(),
//     dispatchEvent: vi.fn(),
//   })),
// })

// // Mock IntersectionObserver
// global.IntersectionObserver = vi.fn().mockImplementation(() => ({
//   observe: vi.fn(),
//   unobserve: vi.fn(),
//   disconnect: vi.fn(),
// }))

// // Mock ResizeObserver
// global.ResizeObserver = vi.fn().mockImplementation(() => ({
//   observe: vi.fn(),
//   unobserve: vi.fn(),
//   disconnect: vi.fn(),
// }))

// // Mock requestAnimationFrame
// global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 16))
// global.cancelAnimationFrame = vi.fn()
