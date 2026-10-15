import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface SceneContentProps {
  isMobile: boolean;
  reducedMotion: boolean;
}

function FloatingGoldCore({ isMobile, reducedMotion }: SceneContentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  // Reusable vectors/euler to avoid GC in animation loop
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // Parallax mouse follow with gentle damping
      const mouseX = state.pointer.x * (isMobile ? 0.2 : 0.6);
      const mouseY = state.pointer.y * (isMobile ? 0.2 : 0.6);

      targetRotation.current.y = mouseX * 0.8;
      targetRotation.current.x = -mouseY * 0.8;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        2.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        2.5,
        delta
      );
    }

    // Slow ambient rotation for wireframe and core
    if (coreRef.current && !reducedMotion) {
      coreRef.current.rotation.y += delta * 0.12;
      coreRef.current.rotation.z += delta * 0.05;
    }
    if (wireframeRef.current && !reducedMotion) {
      wireframeRef.current.rotation.y -= delta * 0.08;
      wireframeRef.current.rotation.x += delta * 0.06;
    }
  });

  const coreRadius = isMobile ? 1.6 : 2.2;
  const wireframeRadius = isMobile ? 1.85 : 2.5;

  return (
    <Float
      speed={reducedMotion ? 0 : isMobile ? 1 : 1.8}
      rotationIntensity={reducedMotion ? 0 : 0.4}
      floatIntensity={reducedMotion ? 0 : 0.6}
      floatingRange={[-0.15, 0.15]}
    >
      <group ref={groupRef} position={[isMobile ? 0 : 1.4, isMobile ? -0.2 : 0, 0]}>
        {/* Core distorted gold metallic icosahedron */}
        <mesh ref={coreRef} castShadow={false} receiveShadow={false}>
          <icosahedronGeometry args={[coreRadius, 4]} />
          <MeshDistortMaterial
            color="#c9a24b"
            metalness={1.0}
            roughness={0.15}
            distort={reducedMotion ? 0 : 0.3}
            speed={reducedMotion ? 0 : 1.5}
          />
        </mesh>

        {/* Faint gold wireframe shell */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[wireframeRadius, 1]} />
          <meshBasicMaterial
            color="#dfbf77"
            wireframe
            transparent
            opacity={isMobile ? 0.12 : 0.22}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Scene3D() {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Determine headless mode to keep rendering lightweight and stable
  const isHeadless = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return !!(
      navigator.webdriver ||
      /HeadlessChrome/i.test(navigator.userAgent)
    );
  }, []);

  if (!hasMounted) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[#050507]"
        aria-hidden="true"
      />
    );
  }

  if (hasWebGLError) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[#050507] opacity-60"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 75% 40%, rgba(201, 162, 75, 0.12), transparent 55%), #050507',
        }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: isMobile ? 0.75 : 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={isHeadless ? 1 : Math.min(1.5, window.devicePixelRatio || 1)}
        gl={{
          antialias: !isHeadless,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050507', 0);
        }}
        onError={() => setHasWebGLError(true)}
      >
        {/* Low ambient light */}
        <ambientLight intensity={0.4} />

        {/* Warm point light top-right */}
        <pointLight position={[6, 7, 5]} intensity={180} color="#f6d38b" />

        {/* Cool blue point light bottom-left */}
        <pointLight position={[-6, -5, -3]} intensity={120} color="#5b86e5" />

        {/* Deep starry background */}
        <Stars
          radius={50}
          depth={40}
          count={isMobile || isHeadless ? 400 : 1200}
          factor={isMobile ? 2.5 : 3.5}
          saturation={0}
          fade
          speed={reducedMotion ? 0 : 0.6}
        />

        {/* Floating icosahedron hero model */}
        <FloatingGoldCore isMobile={isMobile} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
