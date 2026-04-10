"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ModelGlobe() {
  const { scene } = useGLTF("/Globe.glb");
  const globeGroup = useRef(null);
  const wrapper = useRef(null);

  const globeScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((object) => {
      if (!object.isLineSegments) return;

      const parentName = object.parent?.name ?? "";
      const material =
        object.material?.clone?.() ?? new THREE.LineBasicMaterial();

      let color = "#81ffae";
      let opacity = 0.9;

      if (parentName === "LatLongLines" || parentName === "Globe") {
        color = "#dfff58";
        opacity = 0.78;
      } else if (parentName === "POLITICAL_BOUNDARIES") {
        color = "#b5ffd2";
        opacity = 0.66;
      } else if (parentName === "SHORE") {
        color = "#28d988";
        opacity = 0.84;
      }

      material.color = new THREE.Color(color);
      material.transparent = true;
      material.opacity = opacity;
      material.toneMapped = false;
      object.material = material;
      object.renderOrder = 2;
    });

    return cloned;
  }, [scene]);

  useFrame((state, delta) => {
    if (wrapper.current) {
      wrapper.current.position.z =
        Math.sin(state.clock.elapsedTime * 0.9) * 0.22;
      wrapper.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
      wrapper.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.16) * 0.04;
    }

    if (globeGroup.current) {
      globeGroup.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={wrapper}>
      <group ref={globeGroup}>
        <primitive object={globeScene} scale={0.00042} />
      </group>
    </group>
  );
}

export default function HeroOrbitalGlobe() {
  return (
    <div className="orbital-core__canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9.6], fov: 32 }}
        gl={{ alpha: true, antialias: true }}
      >
        <fog attach="fog" args={["#04110c", 10, 18]} />
        <ambientLight intensity={0.35} color="#b5ffd2" />
        <directionalLight
          position={[5, 4, 6]}
          intensity={1.6}
          color="#dfff58"
        />
        <pointLight position={[-6, -3, 4]} intensity={1.1} color="#28d988" />
        <pointLight position={[0, 5, -4]} intensity={0.8} color="#81ffae" />
        <ModelGlobe />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.72}
          minDistance={7.6}
          maxDistance={13.5}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/Globe.glb");
