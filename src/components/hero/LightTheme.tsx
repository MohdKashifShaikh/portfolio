"use client";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function LightBlobs() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        // style={{
        //   position: "absolute",
        //   inset: 0,
        //   zIndex: -1,
        //   pointerEvents: "none",
        // }}
      >
        <ambientLight intensity={0.8} />

        <Float speed={3} rotationIntensity={2} floatIntensity={2}>
          {/* Blob 1 */}
          <mesh position={[-1.2, -0.5, 0]}>
            <sphereGeometry args={[1.8, 32, 32]} />
            <meshBasicMaterial
              color={"#da91a3ff"} // soft pink
              //   color={"#ffb3c6"} // soft pink
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Blob 2 */}
          <mesh position={[1.2, 0.4, 0]}>
            <sphereGeometry args={[1.6, 32, 32]} />
            <meshBasicMaterial
              color={"#84d7e1"} // soft blue
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Blob 3 */}
          <mesh position={[0, -1, -1]}>
            <sphereGeometry args={[2.4, 32, 32]} />
            <meshBasicMaterial
              color={"#ffeec7"} // soft warm yellow
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </Float>
      </Canvas>
    </>
  );
}
