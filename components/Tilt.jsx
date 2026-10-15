'use client';

import React, { useRef, useState, useCallback } from 'react';

export default function Tilt({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
}) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 2 - 1;
    const yPercent = (y / rect.height) * 2 - 1;

    const rotateX = -(yPercent * maxTilt);
    const rotateY = xPercent * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    });
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
