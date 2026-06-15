"use client";

import { forwardRef, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface WatchFinish {
  caseColor: string;
  caseDeep: string;
  dialColor: string;
  strapColor: string;
  accent: string;
}

export const FINISH_GOLD: WatchFinish = {
  caseColor: "#c9a86d",
  caseDeep: "#9a7c46",
  dialColor: "#0c0a08",
  strapColor: "#16110d",
  accent: "#e6cd96",
};

/** Part groups slide apart along the case axis as explode goes 0 → 1. */
const EXPLODE_OFFSETS = {
  crystal: 1.15,
  bezel: 0.78,
  hands: 0.52,
  dial: 0.3,
  chapter: 0.16,
  movement: -0.42,
  caseback: -0.8,
  strap: -1.15,
};

/** Assembled-state y of each exploding part group. */
const REST_Y = {
  crystal: 0,
  bezel: 0,
  hands: 0.19,
  dial: 0.155,
  chapter: 0,
  movement: -0.02,
  caseback: 0,
  strap: 0,
};

function Metal({
  color,
  rough = 0.18,
  env = 1.5,
}: {
  color: string;
  rough?: number;
  env?: number;
  /** kept for call-site compatibility; clearcoat is no longer used so the
   *  metals compile as the lighter standard shader (big TBT win on the hero) */
  clearcoat?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={1}
      roughness={rough}
      envMapIntensity={env}
    />
  );
}

function Indices({ accent }: { accent: string }) {
  const items = useMemo(() => {
    const arr: { pos: [number, number, number]; rot: number; major: boolean }[] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      arr.push({
        pos: [Math.sin(a) * 0.72, 0.02, Math.cos(a) * 0.72],
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
          <Metal color={accent} rough={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function Movement({ finish }: { finish: WatchFinish }) {
  // hinted calibre: main plate, gear train, balance wheel
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.78, 0.78, 0.05, 48]} />
        <meshStandardMaterial color="#3c3325" metalness={0.9} roughness={0.35} envMapIntensity={0.9} />
      </mesh>
      {[
        [0.3, 0.18, 32],
        [-0.25, 0.24, 28],
        [-0.02, 0.13, 20],
        [0.12, 0.34, 24],
      ].map(([x, r, seg], i) => (
        <mesh key={i} position={[x as number, 0.045, i * 0.12 - 0.18]}>
          <cylinderGeometry args={[r as number, r as number, 0.02, seg as number]} />
          <Metal color={i % 2 ? finish.caseColor : "#b8bcc2"} rough={0.25} env={1.2} clearcoat={0} />
        </mesh>
      ))}
      {/* balance wheel */}
      <mesh position={[-0.38, 0.06, -0.34]}>
        <torusGeometry args={[0.14, 0.025, 12, 32]} />
        <Metal color={finish.accent} rough={0.2} />
      </mesh>
    </group>
  );
}

export interface WatchModelHandle {
  group: THREE.Group | null;
}

/**
 * The shared procedural VANTA watch. `explodeRef` (0..1) slides the part
 * stack apart for the anatomy section; `finish` recolors it for the
 * configurator; `spinSeconds` keeps the small seconds hand alive.
 */
const WatchModel = forwardRef<THREE.Group, {
  finish?: WatchFinish;
  explodeRef?: React.MutableRefObject<number>;
  spinSeconds?: boolean;
}>(function WatchModel({ finish = FINISH_GOLD, explodeRef, spinSeconds = true }, ref) {
  const parts = {
    crystal: useRef<THREE.Group>(null),
    bezel: useRef<THREE.Group>(null),
    hands: useRef<THREE.Group>(null),
    dial: useRef<THREE.Group>(null),
    chapter: useRef<THREE.Group>(null),
    movement: useRef<THREE.Group>(null),
    caseback: useRef<THREE.Group>(null),
    strap: useRef<THREE.Group>(null),
  };
  const seconds = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (spinSeconds && seconds.current) {
      seconds.current.rotation.y -= delta * (Math.PI / 30);
    }
    const e = explodeRef?.current ?? 0;
    for (const [k, r] of Object.entries(parts)) {
      if (!r.current) continue;
      const key = k as keyof typeof EXPLODE_OFFSETS;
      const target = REST_Y[key] + EXPLODE_OFFSETS[key] * e;
      r.current.position.y = THREE.MathUtils.damp(r.current.position.y, target, 8, delta);
    }
  });

  const hourRot = -((10 + 9 / 60) / 12) * Math.PI * 2;
  const minRot = -(9 / 60) * Math.PI * 2;

  return (
    <group ref={ref}>
      {/* crystal */}
      <group ref={parts.crystal}>
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.86, 0.86, 0.05, 48]} />
          <meshPhysicalMaterial
            color="#cdd6e0"
            metalness={0}
            roughness={0.03}
            transparent
            opacity={0.07}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={1.2}
          />
        </mesh>
      </group>

      {/* bezel */}
      <group ref={parts.bezel}>
        <mesh position={[0, 0.16, 0]}>
          <torusGeometry args={[0.94, 0.085, 24, 72]} />
          <Metal color={finish.caseColor} rough={0.08} env={1.7} />
        </mesh>
      </group>

      {/* hands */}
      <group ref={parts.hands} position={[0, 0.19, 0]}>
        <group rotation={[0, hourRot, 0]}>
          <mesh position={[0, 0, 0.19]}>
            <boxGeometry args={[0.045, 0.02, 0.42]} />
            <Metal color={finish.caseColor} rough={0.12} />
          </mesh>
        </group>
        <group position={[0, 0.012, 0]} rotation={[0, minRot, 0]}>
          <mesh position={[0, 0, 0.28]}>
            <boxGeometry args={[0.034, 0.016, 0.62]} />
            <Metal color={finish.caseColor} rough={0.12} />
          </mesh>
        </group>
        <group ref={seconds} position={[0, 0.024, 0]}>
          <mesh position={[0, 0, 0.26]}>
            <boxGeometry args={[0.012, 0.01, 0.7]} />
            <Metal color={finish.accent} rough={0.15} />
          </mesh>
        </group>
        <mesh>
          <cylinderGeometry args={[0.045, 0.045, 0.06, 24]} />
          <Metal color={finish.caseColor} rough={0.1} />
        </mesh>
      </group>

      {/* dial */}
      <group ref={parts.dial} position={[0, 0.155, 0]}>
        <mesh>
          <cylinderGeometry args={[0.84, 0.84, 0.025, 72]} />
          <meshStandardMaterial
            color={finish.dialColor}
            metalness={0.3}
            roughness={0.5}
            envMapIntensity={0.4}
          />
        </mesh>
        <Indices accent={finish.accent} />
      </group>

      {/* chapter ring */}
      <group ref={parts.chapter}>
        <mesh position={[0, 0.145, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.03, 72]} />
          <meshStandardMaterial color="#0e0c0a" metalness={0.35} roughness={0.6} envMapIntensity={0.3} />
        </mesh>
      </group>

      {/* case + crown + lugs */}
      <group>
        <mesh>
          <cylinderGeometry args={[1.02, 1.02, 0.3, 72]} />
          <Metal color={finish.caseDeep} rough={0.26} env={1.25} />
        </mesh>
        <mesh position={[1.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.14, 24]} />
          <Metal color={finish.caseColor} rough={0.18} />
        </mesh>
        {[
          [0.4, 1.0],
          [-0.4, 1.0],
          [0.4, -1.0],
          [-0.4, -1.0],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.04, z * 0.98]} rotation={[z > 0 ? -0.2 : 0.2, 0, 0]}>
            <boxGeometry args={[0.14, 0.12, 0.3]} />
            <Metal color={finish.caseDeep} rough={0.28} env={1.15} />
          </mesh>
        ))}
      </group>

      {/* movement (revealed when exploded / from the back) */}
      <group ref={parts.movement} position={[0, -0.02, 0]}>
        <Movement finish={finish} />
      </group>

      {/* caseback */}
      <group ref={parts.caseback}>
        <mesh position={[0, -0.17, 0]}>
          <cylinderGeometry args={[0.96, 0.96, 0.05, 72]} />
          <Metal color={finish.caseDeep} rough={0.3} env={1.1} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <torusGeometry args={[0.7, 0.03, 10, 48]} />
          <Metal color={finish.caseColor} rough={0.2} />
        </mesh>
      </group>

      {/* strap */}
      <group ref={parts.strap}>
        {[1, -1].map((dir) => (
          <group key={dir}>
            <mesh position={[0, -0.32, dir * 1.78]} rotation={[dir * -0.5, 0, 0]}>
              <boxGeometry args={[0.6, 0.07, 1.6]} />
              <meshStandardMaterial color={finish.strapColor} metalness={0.1} roughness={0.75} envMapIntensity={0.4} />
            </mesh>
            <mesh position={[0, -0.07, dir * 1.04]} rotation={[dir * -0.22, 0, 0]}>
              <boxGeometry args={[0.6, 0.07, 0.5]} />
              <meshStandardMaterial color={finish.strapColor} metalness={0.1} roughness={0.7} envMapIntensity={0.4} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
});

export default WatchModel;
