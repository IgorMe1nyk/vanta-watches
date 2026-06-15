"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import WatchModel from "./WatchModel";
import StudioLights from "./StudioLights";

function Rig({ explodeRef }: { explodeRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.12;
    group.current.rotation.x = 0.42 + Math.sin(t * 0.18) * 0.03;
  });
  return (
    <group ref={group} rotation={[0.42, 0, 0]} scale={0.78}>
      <WatchModel explodeRef={explodeRef} />
    </group>
  );
}

export default function MovementScene({
  explodeRef,
}: {
  explodeRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 5.4], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <Rig explodeRef={explodeRef} />
      <StudioLights />
    </Canvas>
  );
}
