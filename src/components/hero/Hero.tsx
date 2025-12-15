"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Galaxy from "./Galaxy";
import styles from "./hero.module.scss";
import Image from "next/image";
import heroImg from "../../assets/images/svg/bro.svg";
import LightBlobs from "./LightTheme";
import FloatingSpheres from "./FloatingSpheres";
import NameWriter from "./NameWriter";
import Button from "../ui/Button";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // ⭐ 2D STARFIELD (BEHIND EVERYTHING)
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 900 }).map(() => ({
      x: Math.random() * w - w / 2,
      y: Math.random() * h - h / 2,
      z: Math.random() * w,
    }));

    const animate = () => {
      ctx.fillStyle = theme === "dark" ? "#3b8fa6ff" : "#ffffffff";
      ctx.clearRect(0, 0, w, h);

      stars.forEach((star) => {
        star.z -= 3;
        if (star.z <= 0) star.z = w;

        const k = 128 / star.z;
        const px = star.x * k + w / 2;
        const py = star.y * k + h / 2;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const size = (1 - star.z / w) * 3;
          ctx.fillRect(px, py, size, size);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      const t = (root.dataset.theme || localStorage.getItem("theme") || "dark") as
        | "light"
        | "dark";
      setTheme(t);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.hero}>
      {/* BACKGROUND: 2D STARFIELD */}
      <canvas ref={canvasRef} className={styles.stars} />

      {/* BACKGROUND: 3D GALAXY (R3F) */}
      <div className={styles.r3fLayer}>
        {theme === "dark" ? (
          <Canvas camera={{ position: [0, 0, 17] }}>
            <Suspense fallback={null}>
              <Galaxy theme={theme} />
            </Suspense>
          </Canvas>
        ) : (
          <FloatingSpheres />
        )}
      </div>

      {/* FOREGROUND CONTENT */}
      <div
        className={`${styles.content} ${theme !== "dark" ? `${styles.dark_theme}` : ""}`}
      >
        <div className={styles.left}>
          <div>
            <h1>
              Hi, I'm <NameWriter />
            </h1>
            <p className={styles.lead}>
              Senior Frontend Developer — building fast, accessible and delightful UI
              experiences.
            </p>

            <div
              className={`${styles.actions} ${
                theme === "dark" ? `${styles.dark_theme}` : ""
              }`}
            >
              <Button href="/projects">See Projects</Button>
              <Button
                href="https://github.com/MohdKashifShaikh"
                variant="outline"
                theme={theme}
              >
                <svg
                  role="img"
                  width="24"
                  height="24"
                  // className="w-15 h-15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-15 ${styles.github_icon} ${
                    theme === "dark" ? `${styles.icon_dark}` : `${styles.icon_light}`
                  }`}
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                </svg>
                View Github
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Image
            src={heroImg}
            width="420"
            height="420"
            alt="Hero"
            className={styles.avatar}
          />
        </div>
      </div>
    </section>
  );
}
