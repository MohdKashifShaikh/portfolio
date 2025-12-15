"use client";
import { ReactLenis } from "lenis/react";
import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}
const SmoothScroll: React.FC<Props> = ({ children }) => {
  const lenisRef = useRef<HTMLDivElement>();

  // useEffect(() => {
  //   function update(time: number) {
  //     lenisRef.current?.lenis?.raf(time);
  //   }

  //   const rafId = requestAnimationFrame(update);

  //   return () => cancelAnimationFrame(rafId);
  // }, []);
  return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroll;
