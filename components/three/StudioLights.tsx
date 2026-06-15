"use client";

import { Environment, Lightformer } from "@react-three/drei";

/** Lightformer-based studio environment — no external HDR fetch. */
export default function StudioLights() {
  return (
    <>
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={4} position={[0, 3, 2]} rotation={[-Math.PI / 3, 0, 0]} scale={[7, 2.5, 1]} color="#fff4dd" />
        <Lightformer intensity={2.6} position={[-4, 1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[4, 1.2, 1]} color="#e6cd96" />
        <Lightformer intensity={2} position={[4, 0, 0.5]} rotation={[0, -Math.PI / 2, 0]} scale={[4, 1, 1]} color="#dfe3e8" />
        <Lightformer intensity={1} position={[0, 0.5, -4]} rotation={[0, Math.PI, 0]} scale={[5, 2, 1]} color="#e6cd96" />
        <Lightformer intensity={0.6} position={[0, -3, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[6, 6, 1]} color="#3a352f" />
      </Environment>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2.5, 4, 3]} intensity={0.7} color="#fff1d6" />
    </>
  );
}
