"use client";
import { LegacyRef, useEffect, useRef, useState } from "react";
import styles from "./career.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  steps: [];
}
const CareerHistory = ({ steps }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  //   const stepRefs = useRef<any>();
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  //   const randomX = gsap.utils.random(-150, 150);
  //   const randomRotate = gsap.utils.random(-15, 15);
  const distance = gsap.utils.random(800, 1500);
  const randomX = Math.random() < 0.5 ? -distance : distance;
  const randomRotate = gsap.utils.random(-15, 15);

  useEffect(() => {
    stepRefs.current.forEach((step: HTMLDivElement, index: number) => {
      const position = index % 2 === 0 ? "left" : "right";
      const distance = gsap.utils.random(800, 1500);
      let startX;
      if (position === "left") {
        startX = -distance;
      } else {
        startX = distance;
      }
      gsap.fromTo(
        step,
        {
          opacity: 0,
          y: 0,
          x: startX, // 🔥 New: Starts hundreds of pixels outside the viewport
          rotation: randomRotate, // Optional: Start with a random rotation
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          x: 0, // Ends at original, centered position
          rotation: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
            // scrub: 0.5,
          },
        }
      );

      // Scroll detection for active step
      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
        onLeaveBack: () => {
          if (index >= 0) {
            setActiveStep(index - 1);
          }
        },
        // onUpdate: (self) => {
        //   if (self.isActive) {
        //     setActiveStep(index);
        //   }
        // },
      });
    });

    // Progress bar animation
    gsap.to(progressRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: progressRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          // self.progress ranges from 0 (start) to 1 (end)
          const progress = self.progress;

          // Define color stops (e.g., transition from light blue to a more vibrant glow)
          let r, g, b;

          // Interpolate between two colors (e.g., from a base color to a destination color)
          // Example: Transitioning from light blue (42, 135, 245) to a vibrant blue (0, 102, 255)
          r = Math.round(42 - 42 * progress);
          g = Math.round(135 - 33 * progress);
          b = Math.round(245 - 40 * progress);

          // Calculate the opacity of the glow (e.g., making it fade in with progress)
          const opacity = 0.2 + 0.3 * progress; // Max opacity of 0.5

          // Construct the RGB color string
          const newGlowColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;

          // Set the CSS variable on the progress bar element
          if (progressRef.current) {
            progressRef.current.style.setProperty("--glow-color", newGlowColor);
          }
        },
      },
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div className={styles.timelineContainer}>
      {/* Progress line */}
      <div className={styles.centerLine}>
        <div className={styles.progressFill} ref={progressRef}></div>
      </div>
      {steps.map((step: any, index: number) => {
        const position = index % 2 === 0 ? "left" : "right";
        return (
          <div
            key={index}
            ref={(el: HTMLDivElement) => {
              if (el) stepRefs.current[index] = el;
            }}
            className={`${styles.stepWrapper} ${styles[position]}`}
          >
            <div
              className={`
                ${styles.marker}
                ${index === activeStep ? styles.active : ""}
                ${index <= activeStep ? styles.completed : ""}
              `}
            >
              {index <= activeStep ? "✓" : index + 1}
            </div>
            {/* Cards */}
            <div className={styles.stepContent}>
              <h3>{step.role}</h3>
              <span className={styles.company}>{step.company}</span>
              <span className={styles.duration}>{step.duration}</span>
              <p>{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CareerHistory;
