import React, { useRef, useState, useEffect } from 'react';
import { calculateTilt } from '../lib/portfolio-utils.ts';

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export default function Tilt({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.015,
  glare = true,
}: TiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const { rotateX, rotateY, glareX, glareY } = calculateTilt(
      e.clientX,
      e.clientY,
      rect,
      maxTilt
    );

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.08s ease-out',
    });

    if (glare) {
      setGlareStyle({
        opacity: 0.15,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(201, 162, 75, 0.45) 0%, transparent 60%)`,
        transition: 'opacity 0.15s ease',
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    if (glare) {
      setGlareStyle({
        opacity: 0,
        transition: 'opacity 0.4s ease-out',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu will-change-transform ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={glareStyle}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
