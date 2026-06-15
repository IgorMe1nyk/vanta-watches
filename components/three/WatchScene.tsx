"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import WatchModel from "./WatchModel";
import StudioLights from "./StudioLights";

function HeroWatchRig({
  scrollRef,
  dragRef,
}: {
  scrollRef?: React.MutableRefObject<number>;
  dragRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const spin = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef?.current ?? 0;

    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x, 0.04);
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y, 0.04);
    // user drag momentum decays back toward the idle sway
    spin.current = THREE.MathUtils.damp(spin.current, dragRef.current, 4, delta);

    // scroll flips the watch over to reveal the caseback + movement
    const flip = scroll * Math.PI * 0.85;
    group.current.rotation.x =
      1.02 + Math.sin(t * 0.2) * 0.05 - pointer.current.y * 0.15 + flip;
    group.current.rotation.y =
      Math.sin(t * 0.28) * 0.32 + pointer.current.x * 0.25 + spin.current;
    group.current.rotation.z = -0.08 + pointer.current.x * 0.06;
  });

  return (
    <group ref={group} rotation={[1.02, 0, -0.08]}>
      <WatchModel />
    </group>
  );
}

function Composition({
  scrollRef,
  dragRef,
}: {
  scrollRef?: React.MutableRefObject<number>;
  dragRef: React.MutableRefObject<number>;
}) {
  const { viewport } = useThree();
  const wide = viewport.width > 3.4;
  const x = wide ? Math.min(viewport.width * 0.24, 1.45) : viewport.width * 0.26;
  const y = wide ? -0.05 : 0.92;
  const scale = wide
    ? Math.min(Math.max(viewport.width * 0.13, 0.52), 0.66)
    : 0.3;

  return (
    <group position={[x, y, 0]} scale={scale}>
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.35}>
        <HeroWatchRig scrollRef={scrollRef} dragRef={dragRef} />
      </Float>
      {/* gold dust drifting in the key light */}
      <Sparkles
        count={42}
        scale={[5.5, 4, 3]}
        size={1.6}
        speed={0.25}
        opacity={0.35}
        color="#e6cd96"
      />
      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.5}
        scale={8}
        blur={2.8}
        far={3.4}
        resolution={512}
        color="#000000"
      />
    </group>
  );
}

export default function WatchScene({
  scrollRef,
}: {
  scrollRef?: React.MutableRefObject<number>;
}) {
  const dragRef = useRef(0);
  const dragging = useRef<{ on: boolean; lastX: number }>({ on: false, lastX: 0 });

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.55, 4.6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", touchAction: "pan-y" }}
      aria-hidden
      onPointerDown={(e) => {
        dragging.current = { on: true, lastX: e.clientX };
      }}
      onPointerMove={(e) => {
        if (!dragging.current.on) return;
        dragRef.current += (e.clientX - dragging.current.lastX) * 0.008;
        dragging.current.lastX = e.clientX;
      }}
      onPointerUp={() => {
        dragging.current.on = false;
        // momentum settles back to neutral
        window.setTimeout(() => {
          dragRef.current = 0;
        }, 1400);
      }}
      onPointerLeave={() => {
        dragging.current.on = false;
      }}
    >
      <Composition scrollRef={scrollRef} dragRef={dragRef} />
      <StudioLights />
    </Canvas>
  );
}
