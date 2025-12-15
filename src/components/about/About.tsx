"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./about.module.scss";
import aboutImg from "../../assets/images/svg/about.svg";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // animation starts when top hits center
          end: "top 50%", // animation ends when bottom hits center
          scrub: 1,
        },
      });
      tl.fromTo(
        imageRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, ease: "power2.out" }
      );

      // Text moves from right to center
      tl.fromTo(
        textRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, ease: "power2.out" },
        "<" // start at same time as image
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.container} ref={sectionRef}>
      <div className={styles.imageWrapper} ref={imageRef}>
        <Image
          src={aboutImg}
          width="420"
          height="420"
          alt="Hero"
          className={styles.image}
        />
      </div>
      <div className={styles.content} ref={textRef}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.description}>
          I’m a developer blending creativity, engineering, and design to build high-end
          digital experiences.
        </p>
        <p className={styles.description}>
          I focus on smooth animations, immersive scroll interactions, and interfaces that
          feel premium.
        </p>
      </div>
    </section>
  );
}

// import styles from "./about.module.scss";

// export default function About() {
//   return (
//     <section id="about" className={styles.about}>
//       <h2>About Me</h2>
//       <p>
//         I'm a Senior Software Developer specializing in scalable UI systems,
//         micro-frontends, microservice architecture and APIs. I work extensively with
//         ReactJS, NodeJS, ExpressJS, and MongoDB, and constantly seek to expand my skills
//         in software development.
//       </p>
//       <p>Here's a look at the technologies I work with.</p>
//       <ul>
//         <li>
//           Frontend
//           <ul>
//             <li>ReactJS</li>
//             <li>NextJS</li>
//             <li>JavaScript</li>
//           </ul>
//         </li>
//         <li>Backend</li>
//         <li>Backend</li>
//         <li>Cloud</li>
//         <li>Tools</li>
//       </ul>
//     </section>
//   );
// }
