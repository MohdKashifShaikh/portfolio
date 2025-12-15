// "use client";

// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import styles from "./parallaxSection.module.scss";

// gsap.registerPlugin(ScrollTrigger);

// interface Props {
//   image: string;
//   strength?: number;
//   height?: string;
//   children?: React.ReactNode;
// }

// export default function ParallaxSection({
//   image,
//   strength = 200, // movement intensity
//   height = "100vh",
//   children,
// }: Props) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const bgRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: 1.2, // smoother
//         },
//       });

//       tl.fromTo(
//         bgRef.current,
//         {
//           y: -strength,
//           scale: 1.2, // slight zoom gives depth
//           rotate: 0.5,
//         },
//         {
//           y: strength,
//           scale: 1,
//           rotate: -0.5,
//           ease: "none",
//         }
//       );
//     });

//     return () => ctx.revert();
//   }, [strength]);

//   return (
//     <section
//       ref={containerRef}
//       className={styles.parallaxContainer}
//       style={{ height }}
//     >
//       <div
//         ref={bgRef}
//         className={styles.bg}
//         style={{ backgroundImage: `url('${image}')` }}
//       />

//       {children && <div className={styles.overlay}>{children}</div>}
//     </section>
//   );
// }

// "use client";
// import { useEffect, useRef } from "react";
// import styles from "./parallaxSection.module.scss";

// export default function ParallaxSection({
//   image,
//   strength = 0.4, // bigger = more scroll movement
//   height = "90vh",
//   children,
// }: {
//   image: string;
//   strength?: number;
//   height?: string;
//   children: React.ReactNode;
// }) {
//   const ref = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     let latestScrollY = window.scrollY;
//     let ticking = false;

//     const updateParallax = () => {
//       const rect = el.getBoundingClientRect();
//       const scroll = latestScrollY;
//       const offset = scroll * strength;

//       // Background movement (smooth)
//       el.style.backgroundPosition = `center ${offset * -1}px`;

//       // Content movement (slight delay effect)
//       const overlay = el.querySelector(".overlay") as HTMLElement | null;
//       if (overlay) {
//         overlay.style.transform = `translateY(${offset * 0.25}px)`;
//       }

//       ticking = false;
//     };

//     const handleScroll = () => {
//       latestScrollY = window.scrollY;
//       if (!ticking) {
//         window.requestAnimationFrame(updateParallax);
//         ticking = true;
//       }
//     };

//     handleScroll(); // initial
//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [strength]);

//   return (
//     <section
//       ref={ref}
//       className={styles.parallax}
//       style={{
//         backgroundImage: `url('${image}')`,
//         height,
//         opacity: 0.5,
//       }}
//     >
//       <div className="overlay">{children}</div>
//     </section>
//   );
// }
