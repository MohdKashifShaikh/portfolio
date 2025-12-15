"use client";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Galaxy({ theme }: { theme: "light" | "dark" }) {
  const ref = useRef<any>();
  const count = 6000;

  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;

      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = (Math.random() - 0.5) * 0.8;

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);
  const starColor = theme === "dark" ? "#080808ff" : "#ff0000ff";

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1;
    ref.current.rotation.x = t;
    ref.current.rotation.y = t;

    ref.current.position.x = state.mouse.x * 0.2;
    ref.current.position.y = state.mouse.y * 0.2;
  });

  return (
    <group scale={20}>
      <Points ref={ref} positions={points} stride={3}>
        <PointMaterial
          transparent
          color={starColor}
          size={theme === "dark" ? 0.09 : 0.09}
          // size={theme === "dark" ? 0.015 : 0.02}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
