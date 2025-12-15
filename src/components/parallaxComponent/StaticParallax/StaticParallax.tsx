"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./staticParallax.module.scss";

export default function StaticParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // CODE MATRIX animations - extended reading time for better UX
  // Stage 1: Animate in (0-0.2), Stage 2: PAUSE & grow (0.2-0.5), Stage 3: Extended reading time (0.5-0.95), Stage 4: Quick exit (0.95-1.0)
  // APPEAR - maximum visibility time for reading
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.95], [0.85, 1, 1.2, 1.25]);
  // VISUAL "LOCK" — extended stationary period for reading
  const y = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.95, 1], [100, 0, 0, 0, -200]);
  // 3D depth - minimal rotation, focus on readability
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.95], [25, 0, 0, -3]);
  // FLOATING ELEMENTS animations - extended stationary period
  const float1Y = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.95, 1], [100, 20, 20, 20, -50]);
  const float2Y = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.95, 1], [-80, -20, -20, -20, 60]);
  const float3Y = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.95, 1], [120, 30, 30, 30, -80]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  // TEXT animations - appear only when codeMatrix starts exiting to avoid overlap
  const titleOpacity = useTransform(scrollYProgress, [0.85, 0.9, 0.98, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.85, 0.9, 0.98, 1], [60, 0, 0, -40]);
  const titleScale = useTransform(scrollYProgress, [0.85, 0.9], [0.8, 1]);

  const codeSnippet = `// Portfolio Developer Profile
import { Developer, Skills, Experience } from '@/types';
import { createInnovation, buildExperience } from '@/utils';

const developer: Developer = {
  name: "Mohd Kashif Shaikh",
  role: "Senior Software Developer",
  location: "India",
  experience: "4+ Years",
  
  // Core Technologies
  skills: {
    frontend: ["React", "Next.js", "Redux Toolkit", "TypeScript", "Tailwind"],
    backend: ["Node.js", "Express", "MongoDB", "NestJS"],
    tools: ["Postman", "Vite", "Git", "GitHub", "Docker", "Framer Motion", "GSAP"],
    unit testing: ["Vitest", "Jest"]
  },
  
  // Professional Mission
  mission: async () => {
    const innovation = await createInnovation({
      creativity: "unlimited",
      technology: "cutting-edge",
      impact: "meaningful"
    });
    
    return \`Crafting digital experiences that 
            inspire, engage, and transform ideas 
            into interactive realities\`;
  },
  
  // Development Philosophy
  philosophy: {
    code: "Clean, scalable, and maintainable",
    design: "User-centered with attention to detail",
    approach: "Innovation through collaboration",
    goal: "Building the future, one component at a time"
  },
  
  // Current Focus
  currentlyWorking: [
    "Advanced React Patterns & NextJS",
    "Performance Optimization",
    "3D Web Experiences", 
    "Accessibility Standards"
  ]
};

export default developer;`;

  return (
    <section className={styles.container} ref={ref}>
      <div className={styles.sticky}>
        {/* Floating Geometric Elements */}
        <motion.div
          className={styles.floatingElement1}
          style={{ y: float1Y, rotate: floatRotate }}
        />
        <motion.div
          className={styles.floatingElement2}
          style={{ y: float2Y, rotate: floatRotate }}
        />
        <motion.div
          className={styles.floatingElement3}
          style={{ y: float3Y, rotate: floatRotate }}
        />

        {/* Code Matrix */}
        <motion.div
          className={styles.codeMatrix}
          style={{
            opacity,
            scale,
            rotateX,
            y,
            // width,
          }}
        >
          <div className={styles.codeWindow}>
            <div className={styles.windowHeader}>
              <div className={styles.windowControls}>
                <span className={styles.control}></span>
                <span className={styles.control}></span>
                <span className={styles.control}></span>
              </div>
              <div className={styles.tabContainer}>
                <div className={styles.activeTab}>
                  <span className={styles.tabIcon}>📄</span>
                  <span className={styles.fileName}>developer.ts</span>
                  <span className={styles.tabClose}>×</span>
                </div>
                <div className={styles.inactiveTab}>
                  <span className={styles.tabIcon}>⚛️</span>
                  <span className={styles.fileName}>portfolio.tsx</span>
                </div>
              </div>
              <div className={styles.headerActions}>
                <span className={styles.branchInfo}>🌿 main</span>
                <span className={styles.statusIndicator}>●</span>
              </div>
            </div>
            <div className={styles.codeContent}>
              <div className={styles.lineNumbers}>
                {Array.from({ length: 42 }, (_, i) => (
                  <span key={i + 1} className={styles.lineNumber}>
                    {i + 1}
                  </span>
                ))}
              </div>
              <div className={styles.codeArea}>
                <pre className={styles.code}>
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
            <div className={styles.statusBar}>
              <div className={styles.statusLeft}>
                <span className={styles.statusItem}>TypeScript</span>
                <span className={styles.statusItem}>UTF-8</span>
                <span className={styles.statusItem}>LF</span>
              </div>
              <div className={styles.statusRight}>
                <span className={styles.statusItem}>Ln 42, Col 2</span>
                <span className={styles.statusItem}>100%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Title */}
        <motion.div
          className={styles.titleContainer}
          style={{
            opacity: titleOpacity,
            y: titleY,
            scale: titleScale,
          }}
        >
          <h1 className={styles.title}>
            <span className={styles.titleLine1}>Synthesizing Code</span>
            <span className={styles.titleLine2}>Interfaces</span>
          </h1>
          <p className={styles.subtitle}>
            Building tomorrow's web with precision, passion, and purpose
          </p>
        </motion.div>
      </div>
    </section>
  );
}
