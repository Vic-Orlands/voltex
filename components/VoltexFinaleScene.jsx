"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

const FONT_URL =
  "https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_bold.typeface.json";

function pseudoRandom(seed) {
  let h = 1779033703;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967295;
  };
}

function Letter({ char, color, seed }) {
  if (char === " ") return null;

  const rng = pseudoRandom(seed);

  const startPos = [
    (rng() - 0.5) * 16,
    10 + rng() * 15,
    (rng() - 0.5) * 10,
  ];

  const startRot = [rng() * Math.PI, rng() * Math.PI, rng() * Math.PI];

  return (
    <RigidBody
      position={startPos}
      rotation={startRot}
      restitution={0.4}
      friction={0.6}
      colliders={false}
    >
      <CuboidCollider args={[0.6, 0.7, 0.2]} position={[0, 0, 0]} />
      <group position={[-0.6, -0.7, -0.2]}>
        <Text3D
          font={FONT_URL}
          size={1.4}
          height={0.4}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={5}
        >
          {char}
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </Text3D>
      </group>
    </RigidBody>
  );
}

export default function VoltexFinaleScene() {
  const text = "POWER DELIVERED";
  const chars1 = text.split("");
  const chars2 = text.split("");

  return (
    <div className="voltex-finale-scene">
      <Canvas
        camera={{ position: [0, 5, 25], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <fog attach="fog" args={["#04110c", 18, 44]} />
        <ambientLight intensity={0.5} color="#b5ffd2" />
        <directionalLight
          position={[10, 20, 10]}
          intensity={2.2}
          color="#81ffae"
          castShadow
        />
        <pointLight position={[-10, 10, -10]} intensity={1.2} color="#dfff58" />
        <pointLight position={[8, 4, 8]} intensity={0.8} color="#28d988" />
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <RigidBody
              type="fixed"
              position={[0, -4, 0]}
              colliders="cuboid"
              friction={1}
              restitution={0.3}
            >
              <mesh receiveShadow>
                <boxGeometry args={[100, 1, 100]} />
                <meshStandardMaterial color="#071912" metalness={0.15} roughness={0.85} />
              </mesh>
            </RigidBody>

            <RigidBody type="fixed" position={[-15, 5, 0]} colliders="cuboid">
              <mesh visible={false}>
                <boxGeometry args={[1, 50, 50]} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[15, 5, 0]} colliders="cuboid">
              <mesh visible={false}>
                <boxGeometry args={[1, 50, 50]} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[0, 5, -15]} colliders="cuboid">
              <mesh visible={false}>
                <boxGeometry args={[50, 50, 1]} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[0, 5, 10]} colliders="cuboid">
              <mesh visible={false}>
                <boxGeometry args={[50, 50, 1]} />
              </mesh>
            </RigidBody>

            {chars1.map((char, index) => (
              <Letter
                key={`set1-${index}`}
                char={char}
                color="#dfff58"
                seed={`${char}-${index}`}
              />
            ))}

            {chars2.map((char, index) => (
              <Letter
                key={`set2-${index}`}
                char={char}
                color="#81ffae"
                seed={`${char}-${index}-voltex`}
              />
            ))}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
