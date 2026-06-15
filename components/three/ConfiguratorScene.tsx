"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import WatchModel, { type WatchFinish } from "./WatchModel";
import StudioLights from "./StudioLights";

function Rig({ finish }: { finish: WatchFinish }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.3) * 0.5;
    group.current.rotation.x = 0.95 + Math.sin(t * 0.22) * 0.05;
  });
  return (
    <group ref={group} rotation={[0.95, 0, -0.06]} scale={0.8}>
      <WatchModel finish={finish} />
    </group>
  );
}

export default function ConfiguratorScene({ finish }: { finish: WatchFinish }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.5, 4.8], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <Float speed={1} rotationIntensity={0.06} floatIntensity={0.3}>
        <Rig finish={finish} />
      </Float>
      <ContactShadows position={[0, -1.8, 0]} opacity={0.45} scale={7} blur={2.6} far={3} resolution={512} color="#000" />
      <StudioLights />
    </Canvas>
  );
}
