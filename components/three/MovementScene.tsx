"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import WatchModel from "./WatchModel";
import StudioLights from "./StudioLights";

function Rig({ explodeRef }: { explodeRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const e = explodeRef.current; // 0 assembled → 1 fully apart
    // slow turntable rotation, plus a scroll-driven tilt that rolls the watch
    // toward the camera so the disassembly reveals the calibre from above
    group.current.rotation.y = t * 0.12;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      0.5 + e * 0.6 + Math.sin(t * 0.18) * 0.03,
      5,
      delta,
    );
    // ease it slightly larger as it opens up
    const s = 0.78 + e * 0.04;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 5, delta));
  });
  return (
    <group ref={group} rotation={[0.5, 0, 0]} scale={0.78}>
      <WatchModel explodeRef={explodeRef} spinSeconds={false} />
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
