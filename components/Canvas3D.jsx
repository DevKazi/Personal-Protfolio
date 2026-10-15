'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function GoldIcosahedron({ isMobile, reducedMotion }) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const wireframeRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      const mouseX = state.pointer.x * (isMobile ? 0.2 : 0.5);
      const mouseY = state.pointer.y * (isMobile ? 0.2 : 0.5);

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        mouseX * 0.7,
        2.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -mouseY * 0.7,
        2.5,
        delta
      );
    }

    if (coreRef.current && !reducedMotion) {
      coreRef.current.rotation.y += delta * 0.1;
      coreRef.current.rotation.z += delta * 0.04;
    }
    if (wireframeRef.current && !reducedMotion) {
      wireframeRef.current.rotation.y -= delta * 0.07;
      wireframeRef.current.rotation.x += delta * 0.05;
    }
  });

  const coreRadius = isMobile ? 1.5 : 2.1;
  const wireframeRadius = isMobile ? 1.75 : 2.4;

  return (
    <Float
      speed={reducedMotion ? 0 : 1.5}
      rotationIntensity={reducedMotion ? 0 : 0.35}
      floatIntensity={reducedMotion ? 0 : 0.5}
      floatingRange={[-0.12, 0.12]}
    >
      <group ref={groupRef} position={[isMobile ? 0 : 1.2, isMobile ? -0.2 : 0, 0]}>
        {/* Core distorted gold metallic icosahedron */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[coreRadius, 4]} />
          <MeshDistortMaterial
            color="#c9a24b"
            metalness={0.95}
            roughness={0.18}
            distort={reducedMotion ? 0 : 0.28}
            speed={reducedMotion ? 0 : 1.4}
          />
        </mesh>

        {/* Faint gold wireframe shell */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[wireframeRadius, 1]} />
          <meshBasicMaterial
            color="#dfbf77"
            wireframe
            transparent
            opacity={isMobile ? 0.1 : 0.22}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Canvas3D() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 640);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-0 bg-[#050507]" />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffe8b0" />
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="#c9a24b" />

        <Stars
          radius={50}
          depth={40}
          count={isMobile ? 600 : 1400}
          factor={3.5}
          saturation={0.5}
          fade
          speed={reducedMotion ? 0 : 0.8}
        />

        <GoldIcosahedron isMobile={isMobile} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
