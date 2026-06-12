"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#c9a86d";
const GOLD_DEEP = "#9a7c46";

function Indices() {
  // 12 applied hour markers
  const items = useMemo(() => {
    const arr: { pos: [number, number, number]; rot: number; major: boolean }[] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const r = 0.72;
      arr.push({
        pos: [Math.sin(a) * r, 0.175, Math.cos(a) * r],
        rot: a,
        major: i % 3 === 0,
      });
    }
    return arr;
  }, []);
  return (
    <group>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} rotation={[0, it.rot, 0]}>
          <boxGeometry args={[0.035, 0.025, it.major ? 0.16 : 0.1]} />
          <meshStandardMaterial
            color={GOLD}
            metalness={1}
            roughness={0.18}
            envMapIntensity={1.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function Hands() {
  const seconds = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (seconds.current) seconds.current.rotation.y -= delta * (Math.PI / 30);
  });
  // classic 10:09 catalogue position
  const hourRot = -((10 + 9 / 60) / 12) * Math.PI * 2;
  const minRot = -(9 / 60) * Math.PI * 2;
  return (
    <group position={[0, 0.19, 0]}>
      <group rotation={[0, hourRot, 0]}>
        <mesh position={[0, 0, 0.19]}>
          <boxGeometry args={[0.045, 0.02, 0.42]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.15} envMapIntensity={1.5} />
        </mesh>
      </group>
      <group position={[0, 0.012, 0]} rotation={[0, minRot, 0]}>
        <mesh position={[0, 0, 0.28]}>
          <boxGeometry args={[0.034, 0.016, 0.62]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.15} envMapIntensity={1.5} />
        </mesh>
      </group>
      <group ref={seconds} position={[0, 0.024, 0]}>
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[0.012, 0.01, 0.7]} />
          <meshStandardMaterial color="#e6cd96" metalness={1} roughness={0.2} envMapIntensity={1.3} />
        </mesh>
      </group>
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, 0.06, 32]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.12} envMapIntensity={1.5} />
      </mesh>
    </group>
  );
}

function Watch() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    // dial stays toward camera; slow sway + pointer-aware tilt
    const t = state.clock.elapsedTime;
    pointer.current.x = THREE.MathUtils.lerp(
      pointer.current.x,
      state.pointer.x,
      0.04,
    );
    pointer.current.y = THREE.MathUtils.lerp(
      pointer.current.y,
      state.pointer.y,
      0.04,
    );
    group.current.rotation.y = Math.sin(t * 0.28) * 0.38 + pointer.current.x * 0.25;
    group.current.rotation.x =
      1.02 + Math.sin(t * 0.2) * 0.05 - pointer.current.y * 0.15;
    group.current.rotation.z = -0.08 + pointer.current.x * 0.06;
  });

  return (
    <group ref={group} rotation={[1.02, 0, -0.08]}>
      {/* case */}
      <mesh>
        <cylinderGeometry args={[1.02, 1.02, 0.3, 72]} />
        <meshStandardMaterial color={GOLD_DEEP} metalness={1} roughness={0.28} envMapIntensity={1.2} />
      </mesh>
      {/* polished bezel */}
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[0.94, 0.085, 24, 72]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.1} envMapIntensity={1.6} />
      </mesh>
      {/* chapter ring */}
      <mesh position={[0, 0.145, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.03, 72]} />
        <meshStandardMaterial
          color="#0e0c0a"
          metalness={0.35}
          roughness={0.6}
          envMapIntensity={0.3}
        />
      </mesh>
      {/* dial — deep matte black so the gold furniture carries the light */}
      <mesh position={[0, 0.155, 0]}>
        <cylinderGeometry args={[0.84, 0.84, 0.025, 72]} />
        <meshStandardMaterial
          color="#0c0a08"
          metalness={0.25}
          roughness={0.55}
          envMapIntensity={0.35}
        />
      </mesh>
      <Indices />
      <Hands />
      {/* crown */}
      <mesh position={[1.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.14, 24]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.2} envMapIntensity={1.4} />
      </mesh>
      {/* lugs */}
      {[
        [0.4, 1.0],
        [-0.4, 1.0],
        [0.4, -1.0],
        [-0.4, -1.0],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.04, z * 0.98]} rotation={[z > 0 ? -0.2 : 0.2, 0, 0]}>
          <boxGeometry args={[0.14, 0.12, 0.3]} />
          <meshStandardMaterial color={GOLD_DEEP} metalness={1} roughness={0.3} envMapIntensity={1.1} />
        </mesh>
      ))}
      {/* leather strap, falling away from the case */}
      {[1, -1].map((dir) => (
        <group key={dir}>
          <mesh
            position={[0, -0.32, dir * 1.78]}
            rotation={[dir * -0.5, 0, 0]}
          >
            <boxGeometry args={[0.6, 0.07, 1.6]} />
            <meshStandardMaterial
              color="#16110d"
              metalness={0.1}
              roughness={0.75}
              envMapIntensity={0.4}
            />
          </mesh>
          <mesh
            position={[0, -0.07, dir * 1.04]}
            rotation={[dir * -0.22, 0, 0]}
          >
            <boxGeometry args={[0.6, 0.07, 0.5]} />
            <meshStandardMaterial
              color="#1a140f"
              metalness={0.1}
              roughness={0.7}
              envMapIntensity={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Composition() {
  const { viewport } = useThree();
  // wide screens: watch sits right of the headline; narrow: smaller, high right
  const wide = viewport.width > 3.4;
  const x = wide ? Math.min(viewport.width * 0.24, 1.45) : viewport.width * 0.26;
  const y = wide ? -0.05 : 0.92;
  const scale = wide
    ? Math.min(Math.max(viewport.width * 0.13, 0.52), 0.66)
    : 0.3;

  return (
    <group position={[x, y, 0]} scale={scale}>
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.35}>
        <Watch />
      </Float>
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

export default function WatchScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.55, 4.6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <Composition />
      {/* studio lighting built from lightformers — no external HDR fetch */}
      <Environment resolution={128} frames={1}>
        <Lightformer
          intensity={4}
          position={[0, 3, 2]}
          rotation={[-Math.PI / 3, 0, 0]}
          scale={[7, 2.5, 1]}
          color="#fff4dd"
        />
        <Lightformer
          intensity={2.6}
          position={[-4, 1, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[4, 1.2, 1]}
          color="#e6cd96"
        />
        <Lightformer
          intensity={2}
          position={[4, 0, 0.5]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[4, 1, 1]}
          color="#dfe3e8"
        />
        <Lightformer
          intensity={1}
          position={[0, 0.5, -4]}
          rotation={[0, Math.PI, 0]}
          scale={[5, 2, 1]}
          color="#e6cd96"
        />
        <Lightformer
          intensity={0.6}
          position={[0, -3, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[6, 6, 1]}
          color="#3a352f"
        />
      </Environment>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2.5, 4, 3]} intensity={0.7} color="#fff1d6" />
    </Canvas>
  );
}
