"use client";
import { useEffect, useRef } from "react";
import styles from "./parallaxSection.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
  image?: string;
  bgColor?: string;
  title?: string;
  children?: React.ReactNode;
}
export default function ParallaxSection({ image, bgColor, title, children }: Props) {
  const container = useRef(null);
  const imageRef = useRef(null);

  // 100vh * 1.5 = 150vh // for below parallax
  const contentRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      const contentElement = contentRef.current;
      if (!contentElement) return;
      const h2Element = contentElement.querySelector("h2");
      const pElement = contentElement.querySelector("p");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      });
      if (h2Element) {
        tl.fromTo(
          h2Element,
          {
            opacity: 0,
            x: "100vw",
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            ease: "power2.out",
          },
          0
        );
      }
      if (pElement) {
        tl.fromTo(
          pElement,
          {
            opacity: 0,
            x: "-50vw",
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            ease: "power2.out",
          },
          0.3
        );
      }
    }, container);
    return () => {
      if (ctx.current) {
        ctx.current.revert();
      }
    };
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      {
        y: "-60vh",
      },
      {
        y: "60vh",
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          scrub: true,
          markers: false,
        },
      }
    );
  }, []);
  return (
    <div
      ref={container}
      className={`${styles.parallax_container}`}
      style={{ backgroundColor: bgColor }}
    >
      {image && <img ref={imageRef} className="h-full w-full object-cover" src={image} />}
      <div ref={contentRef} className={`${styles.parallax_content_wrapper} px-4`}>
        {children}
      </div>
    </div>
  );
}
