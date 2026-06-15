"use client";

import { forwardRef, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
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
  strapColor: "#1a130d",
  accent: "#e6cd96",
};

/** Part groups slide apart along the case axis as explode goes 0 → 1. */
const EXPLODE_OFFSETS = {
  crystal: 1.25,
  bezel: 0.8,
  hands: 0.52,
  dial: 0.3,
  chapter: 0.16,
  movement: -0.42,
  caseback: -0.82,
  strap: -1.2,
};

/** Assembled-state y of each exploding part group. */
const REST_Y = {
  crystal: 0.17,
  bezel: 0.16,
  hands: 0.2,
  dial: 0.158,
  chapter: 0.146,
  movement: -0.02,
  caseback: -0.17,
  strap: 0,
};

function Metal({
  color,
  rough = 0.2,
  env = 1.4,
}: {
  color: string;
  rough?: number;
  env?: number;
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

function PartLabel({ text }: { text: string }) {
  return (
    <Html center distanceFactor={6} zIndexRange={[40, 0]} pointerEvents="none">
      <div className="explode-label flex items-center gap-2 whitespace-nowrap">
        <span className="h-px w-5 bg-gold/70" />
        <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-ivory">
          {text}
        </span>
      </div>
    </Html>
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
        <mesh key={i} position={it.pos} rotation={[0, it.rot, 0]} castShadow>
          <boxGeometry args={[0.03, 0.022, it.major ? 0.16 : 0.09]} />
          <Metal color={accent} rough={0.16} env={1.6} />
        </mesh>
      ))}
    </group>
  );
}

function Movement({ finish }: { finish: WatchFinish }) {
  return (
    <group>
      {/* main plate */}
      <mesh>
        <cylinderGeometry args={[0.78, 0.78, 0.05, 56]} />
        <meshStandardMaterial color="#363022" metalness={0.9} roughness={0.4} envMapIntensity={0.8} />
      </mesh>
      {/* gear train */}
      {[
        [0.3, 0.18, 28],
        [-0.27, 0.24, 26],
        [-0.02, 0.13, 18],
        [0.16, 0.32, 24],
        [-0.4, 0.1, 16],
      ].map(([x, r, seg], i) => (
        <mesh key={i} position={[x as number, 0.05, i * 0.13 - 0.22]}>
          <cylinderGeometry args={[r as number, r as number, 0.02, seg as number]} />
          <Metal color={i % 2 ? finish.caseColor : "#b8bcc2"} rough={0.3} env={1.1} />
        </mesh>
      ))}
      {/* balance wheel */}
      <mesh position={[-0.4, 0.08, -0.36]}>
        <torusGeometry args={[0.14, 0.022, 10, 28]} />
        <Metal color={finish.accent} rough={0.25} />
      </mesh>
      {/* a few jewels */}
      {[
        [0.32, -0.1],
        [-0.18, 0.22],
        [0.05, -0.3],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.07, z]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshStandardMaterial color="#b3122f" metalness={0.2} roughness={0.25} emissive="#5c0a18" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export interface WatchModelProps {
  finish?: WatchFinish;
  explodeRef?: React.MutableRefObject<number>;
  spinSeconds?: boolean;
  showLabels?: boolean;
}

/**
 * Shared procedural VANTA watch. `explodeRef` (0..1) slides the part stack
 * apart; `finish` recolours it; `showLabels` reveals thin part labels (used
 * by the hover-to-explode hero). Geometry refined: domed sapphire, brushed
 * caseband + polished bezel, dauphine hands, a curved tapering strap.
 */
const WatchModel = forwardRef<THREE.Group, WatchModelProps>(function WatchModel(
  { finish = FINISH_GOLD, explodeRef, spinSeconds = true, showLabels = false },
  ref,
) {
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
      {/* ---------- crystal: shallow dome, very subtle ---------- */}
      <group ref={parts.crystal} position={[0, REST_Y.crystal, 0]}>
        <mesh position={[0, 0, 0]} scale={[0.82, 0.08, 0.82]}>
          <sphereGeometry args={[1, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#cfd8e2"
            metalness={0.1}
            roughness={0.05}
            transparent
            opacity={0.12}
            envMapIntensity={1.3}
          />
        </mesh>
        {showLabels && <PartLabel text="Sapphire crystal" />}
      </group>

      {/* ---------- bezel: polished, fluted edge ---------- */}
      <group ref={parts.bezel} position={[0, REST_Y.bezel, 0]}>
        <mesh castShadow>
          <torusGeometry args={[0.93, 0.08, 28, 80]} />
          <Metal color={finish.caseColor} rough={0.07} env={1.8} />
        </mesh>
        {showLabels && <PartLabel text="Bezel" />}
      </group>

      {/* ---------- hands: tapered dauphine ---------- */}
      <group ref={parts.hands} position={[0, REST_Y.hands, 0]}>
        <group rotation={[0, hourRot, 0]}>
          <mesh position={[0, 0, 0.17]}>
            <boxGeometry args={[0.04, 0.018, 0.4]} />
            <Metal color={finish.accent} rough={0.12} env={1.7} />
          </mesh>
        </group>
        <group position={[0, 0.014, 0]} rotation={[0, minRot, 0]}>
          <mesh position={[0, 0, 0.26]}>
            <boxGeometry args={[0.03, 0.014, 0.6]} />
            <Metal color={finish.accent} rough={0.12} env={1.7} />
          </mesh>
        </group>
        <group ref={seconds} position={[0, 0.026, 0]}>
          <mesh position={[0, 0, 0.22]}>
            <boxGeometry args={[0.01, 0.008, 0.66]} />
            <Metal color={finish.accent} rough={0.18} />
          </mesh>
          <mesh position={[0, 0, -0.14]}>
            <boxGeometry args={[0.022, 0.01, 0.18]} />
            <Metal color={finish.accent} rough={0.18} />
          </mesh>
        </group>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 0.06, 24]} />
          <Metal color={finish.caseColor} rough={0.1} env={1.6} />
        </mesh>
        {showLabels && <PartLabel text="Hands" />}
      </group>

      {/* ---------- dial: matte, applied indices ---------- */}
      <group ref={parts.dial} position={[0, REST_Y.dial, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[0.84, 0.84, 0.02, 80]} />
          <meshStandardMaterial
            color={finish.dialColor}
            metalness={0.35}
            roughness={0.52}
            envMapIntensity={0.4}
          />
        </mesh>
        <Indices accent={finish.accent} />
        {showLabels && <PartLabel text="Dial" />}
      </group>

      {/* ---------- chapter ring ---------- */}
      <group ref={parts.chapter} position={[0, REST_Y.chapter, 0]}>
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.028, 80]} />
          <meshStandardMaterial color="#0e0c0a" metalness={0.4} roughness={0.55} envMapIntensity={0.3} />
        </mesh>
      </group>

      {/* ---------- case band + crown + lugs (the anchor, never moves) ---------- */}
      <group>
        {/* brushed mid-case */}
        <mesh castShadow>
          <cylinderGeometry args={[1.0, 1.02, 0.32, 80]} />
          <Metal color={finish.caseDeep} rough={0.34} env={1.2} />
        </mesh>
        {/* polished chamfer */}
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[1.0, 0.95, 0.06, 80]} />
          <Metal color={finish.caseColor} rough={0.12} env={1.6} />
        </mesh>
        {/* fluted crown */}
        <group position={[1.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.085, 0.085, 0.13, 20]} />
            <Metal color={finish.caseColor} rough={0.22} env={1.4} />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <sphereGeometry args={[0.05, 16, 12]} />
            <Metal color={finish.accent} rough={0.18} />
          </mesh>
        </group>
        {/* tapered lugs */}
        {[
          [0.46, 1],
          [-0.46, 1],
          [0.46, -1],
          [-0.46, -1],
        ].map(([x, z], i) => (
          <mesh
            key={i}
            position={[x, -0.02, (z as number) * 0.96]}
            rotation={[(z as number) > 0 ? -0.32 : 0.32, 0, 0]}
            castShadow
          >
            <boxGeometry args={[0.18, 0.14, 0.36]} />
            <Metal color={finish.caseDeep} rough={0.3} env={1.2} />
          </mesh>
        ))}
      </group>

      {/* ---------- movement (revealed when exploded / from the back) ---------- */}
      <group ref={parts.movement} position={[0, REST_Y.movement, 0]}>
        <Movement finish={finish} />
        {showLabels && <PartLabel text="Calibre VNT-01" />}
      </group>

      {/* ---------- caseback: solid with engraved ring ---------- */}
      <group ref={parts.caseback} position={[0, REST_Y.caseback, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.95, 0.97, 0.05, 80]} />
          <Metal color={finish.caseDeep} rough={0.32} env={1.1} />
        </mesh>
        <mesh position={[0, -0.03, 0]}>
          <torusGeometry args={[0.68, 0.025, 10, 56]} />
          <Metal color={finish.caseColor} rough={0.2} />
        </mesh>
        {showLabels && <PartLabel text="Caseback" />}
      </group>

      {/* ---------- strap: curved, tapering segments either side ---------- */}
      <group ref={parts.strap} position={[0, REST_Y.strap, 0]}>
        {[1, -1].map((dir) => {
          const segs = [
            { z: 1.04, y: -0.05, rot: 0.16, w: 0.6, len: 0.46 },
            { z: 1.42, y: -0.18, rot: 0.42, w: 0.54, len: 0.46 },
            { z: 1.72, y: -0.4, rot: 0.68, w: 0.48, len: 0.42 },
          ];
          return (
            <group key={dir}>
              {segs.map((s, i) => (
                <mesh
                  key={i}
                  position={[0, s.y, dir * s.z]}
                  rotation={[dir * -s.rot, 0, 0]}
                  castShadow
                >
                  <boxGeometry args={[s.w, 0.06, s.len]} />
                  <meshStandardMaterial
                    color={finish.strapColor}
                    metalness={0.05}
                    roughness={0.82}
                    envMapIntensity={0.3}
                  />
                </mesh>
              ))}
            </group>
          );
        })}
        {showLabels && <PartLabel text="Strap" />}
      </group>
    </group>
  );
});

export default WatchModel;
