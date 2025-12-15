"use client";
import { useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import styles from "./videoScrub.module.scss";

interface Props {
  frameCount: number;
  path: (index: number) => string; // e.g. index => `/frames/frame_${index}.webp`
}

export default function VideoScrub({ frameCount, path }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
console.log(path)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload images ONCE
  useEffect(() => {
    const frames: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = path(i);
      frames.push(img);
    }
    setImages(frames);
  }, [frameCount, path]);

  // Draw frames synced with scroll
  useEffect(() => {
    if (images.length === 0) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let currentFrame = 0;
    let targetFrame = 0;
    let raf: number;

    const draw = () => {
      currentFrame += (targetFrame - currentFrame) * 0.15; // smooth lerp
      const frameIndex = Math.round(currentFrame);

      const img = images[frameIndex];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      raf = requestAnimationFrame(draw);
    };

    const unsub = scrollYProgress.on("change", (v) => {
      targetFrame = Math.min(frameCount - 1, Math.floor(v * frameCount));
    });

    draw();

    return () => {
      unsub();
      cancelAnimationFrame(raf);
    };
  }, [images, frameCount, scrollYProgress]);

  return (
    <section ref={sectionRef} className={styles.container}>
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
      </div>
    </section>
  );
}
