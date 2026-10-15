import type { PortfolioData } from './data.ts';

/**
 * Pure utility functions for portfolio calculations, navigation, and validation.
 */

export interface TiltResult {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

export function calculateTilt(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxTiltDegrees = 12
): TiltResult {
  if (rect.width <= 0 || rect.height <= 0) {
    return { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 };
  }

  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const normalizedX = (x / rect.width) * 2 - 1; // -1 to 1
  const normalizedY = (y / rect.height) * 2 - 1; // -1 to 1

  const clampedX = Math.max(-1, Math.min(1, normalizedX));
  const clampedY = Math.max(-1, Math.min(1, normalizedY));

  // Tilting up (negative Y) tilts surface towards viewer (positive rotateX)
  const rotateX = -(clampedY * maxTiltDegrees);
  const rotateY = clampedX * maxTiltDegrees;

  const glareX = Math.round(((clampedX + 1) / 2) * 100);
  const glareY = Math.round(((clampedY + 1) / 2) * 100);

  return {
    rotateX: Number(rotateX.toFixed(2)),
    rotateY: Number(rotateY.toFixed(2)),
    glareX,
    glareY,
  };
}

export function getNextIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function getPrevIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
}

export function formatWhatsAppUrl(phoneNumber: string, message?: string): string {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const baseUrl = `https://wa.me/${cleanNumber}`;
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function verifyPortfolioIntegrity(data: PortfolioData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.owner?.name) errors.push('Missing owner name');
  if (!validateEmail(data.contact?.email || '')) errors.push('Invalid contact email');
  if (!data.contact?.whatsappUrl?.startsWith('https://wa.me/')) {
    errors.push('WhatsApp URL must start with https://wa.me/');
  }

  if (!Array.isArray(data.certificates?.items) || data.certificates.items.length < 10) {
    errors.push(`Expected at least 10 certificates, found ${data.certificates?.items?.length ?? 0}`);
  }

  if (!Array.isArray(data.services?.items) || data.services.items.length !== 6) {
    errors.push(`Expected exactly 6 services, found ${data.services?.items?.length ?? 0}`);
  }

  if (!Array.isArray(data.about?.stats) || data.about.stats.length !== 4) {
    errors.push(`Expected exactly 4 stats, found ${data.about?.stats?.length ?? 0}`);
  }

  if (!Array.isArray(data.about?.skillCategories) || data.about.skillCategories.length !== 4) {
    errors.push(`Expected 4 skill categories, found ${data.about?.skillCategories?.length ?? 0}`);
  }

  data.certificates?.items?.forEach((cert, idx) => {
    if (!cert.alt) errors.push(`Certificate #${idx + 1} is missing alt text`);
    if (!cert.image) errors.push(`Certificate #${idx + 1} is missing image path`);
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
