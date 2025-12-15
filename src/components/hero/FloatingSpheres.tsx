import * as THREE from "three";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

interface MovingSphereProps {
  color: string;
  initialPos?: [number, number, number];
  speed: number;
  size?: number;
  distort?: number;
  opacity?: number;
  radius: number;
  velocity?: any;
}
function FloatingBlob({ radius, color, speed }: MovingSphereProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const opacity = useRef(0); // for fade in/out
  const fadeDir = useRef(1); // 1 = fade in, -1 = fade out
  const initialPosition = useRef([
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.5) * 10,
  ]);

  // random direction
  const velocity = useRef([
    (Math.random() - 0.5) * speed,
    (Math.random() - 0.5) * speed,
    (Math.random() - 0.5) * speed,
  ]);

  // place blob in random world position
  useEffect(() => {
    if (!mesh.current) return;
    mesh.current.position.set(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 10
    );
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const limit = 8;
    // movement
    mesh.current.position.x += velocity.current[0];
    mesh.current.position.y += velocity.current[1];
    mesh.current.position.z += velocity.current[2] * 0.5;

    // fade-out when leaving boundary
    if (
      Math.abs(mesh.current.position.x) > limit ||
      Math.abs(mesh.current.position.y) > limit ||
      Math.abs(mesh.current.position.z) > limit
    ) {
      fadeDir.current = -1; // fade out
    }

    // fade animation
    opacity.current += fadeDir.current * 0.15;
    // opacity.current += fadeDir.current * 0.015;
    opacity.current = Math.min(Math.max(opacity.current, 0), 1);

    // when invisible → reset position smoothly
    if (opacity.current <= 0) {
      initialPosition.current = [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
      ];

      mesh.current.position.set(
        initialPosition.current[0],
        initialPosition.current[1],
        initialPosition.current[2]
      );

      // randomize velocity again
      velocity.current = [
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.5) * speed,
      ];

      fadeDir.current = 1; // fade in
    }

    // apply opacity to material
    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    mat.opacity = opacity.current;
    mat.transparent = true;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.4} opacity={0} transparent />
    </mesh>
  );
}

export default function FloatingBlobsBackground() {
  const colors = ["#84d7e1"];
  //   const colors = ["#98e8feff", "#c4b5fd", "#ff9cf4", "#ffeb99", "#6affc1"];
  const blobs = Array.from({ length: 20 }).map(() => ({
    radius: 0.2 + Math.random() * 0.8,
    // color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 0.01 + Math.random() * 0.1, // speed control
  }));

  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={3} />
      <pointLight position={[10, 10, 10]} />

      {blobs.map((b, i) => (
        <FloatingBlob key={i} {...b} />
      ))}
    </Canvas>
  );
}

// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { Sphere, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
// import { useRef, useMemo } from "react";
// import * as THREE from "three";

// interface MovingSphereProps {
//   color: string;
//   size: number;
//   initialPosition: [number, number, number];
//   speed: number;
//   distort: number;
//   opacity: number;
// }

// function MovingSphere({
//   color,
//   size,
//   initialPosition,
//   speed,
//   distort,
//   opacity,
// }: MovingSphereProps) {
//   const meshRef = useRef<THREE.Mesh>(null);

//   const velocity = useMemo(() => {
//     return new THREE.Vector3(
//       (Math.random() - 0.5) * speed,
//       (Math.random() - 0.5) * speed,
//       (Math.random() - 0.5) * speed
//     );
//   }, [speed]);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.position.add(velocity);

//       // Bounce back when reaching limits
//       const limit = 6;
//       ["x", "y", "z"].forEach((axis) => {
//         if (Math.abs(meshRef.current!.position[axis]) > limit) {
//           velocity[axis] = -velocity[axis];
//         }
//       });
//     }
//   });

//   return (
//     <Sphere ref={meshRef} args={[size, 64, 64]} position={initialPosition}>
//       <MeshDistortMaterial
//         color={color}
//         roughness={0}
//         speed={speed}
//         distort={distort}
//         transparent
//         opacity={opacity}
//       />
//     </Sphere>
//   );
// }

// export default function FloatingSpheres() {
//   const NUM_SPHERES = 27;

//   // Generate random spheres
//   const spheres = useMemo(() => {
//     const colors = ["#98e8feff", "#c4b5fd", "#ff9cf4", "#ffeb99", "#6affc1"];
//     // const colors = ["#ff6b6b", "#6bc1ff", "#ffdb6b", "#8affc1"];
//     let arr = [];
//     for (let i = 0; i < NUM_SPHERES; i++) {
//       arr.push({
//         color: colors[Math.floor(Math.random() * colors.length)],
//         size: Math.random() * 0.7 + 0.3, // smaller ones
//         // size: Math.random() * 1.2 + 0.3, // size between 0.3 and 1.5
//         position: [
//           (Math.random() - 0.5) * 20,
//           (Math.random() - 0.5) * 20,
//           (Math.random() - 0.5) * 20,
//         ] as [number, number, number],
//         // position: [
//         //   (Math.random() - 0.5) * 10,
//         //   (Math.random() - 0.5) * 6,
//         //   (Math.random() - 0.5) * 8,
//         // ] as [number, number, number],
//         speed: Math.random() * 0.05 + 0.005, // speed 0.005–0.025
//         distort: Math.random() * 0.5 + 0.1, // distort 0.1–0.6
//         opacity: Math.random() * 0.4 + 0.2, // opacity 0.2–0.6
//       });
//     }
//     return arr;
//   }, []);

//   return (
//     <Canvas
//       camera={{ position: [0, 0, 10], fov: 50 }}
//       style={{ width: "100%", height: "100%" }}
//     >
//       <ambientLight intensity={0.6} />

//       {spheres.map((s, index) => (
//         <MovingSphere
//           key={index}
//           color={s.color}
//           size={s.size}
//           initialPosition={s.position}
//           speed={s.speed}
//           distort={s.distort}
//           opacity={s.opacity}
//         />
//       ))}

//       <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
//     </Canvas>
//   );
// }
