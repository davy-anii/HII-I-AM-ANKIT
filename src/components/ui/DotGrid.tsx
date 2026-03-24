"use client";

import React, { useRef, useEffect } from "react";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  resistance?: number;
  returnDuration?: number;
}

// Returns null on mobile/touch devices: the physics canvas loop is too
// CPU-intensive for touch screens and causes noticeable page jank.
function useIsMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
    window.innerWidth <= 768
  );
}

export default function DotGrid({
  dotSize = 5,
  gap = 15,
  baseColor = "#271E37",
  activeColor = "#5227FF",
  proximity = 120,
  shockRadius = 250,
  shockStrength = 5,
  resistance = 750,
  returnDuration = 1.5,
}: DotGridProps) {
  // Skip on mobile — canvas physics loop causes severe jank on touch devices
  const isMobile = useIsMobileDevice();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isMobile) return; // extra guard in case SSR mismatch
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots: any[] = [];
    let mx = -1000;
    let my = -1000;
    
    // Parse Hex to Object
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 50, g: 50, b: 50 };
    };
    
    const baseRgb = hexToRgb(baseColor);
    const activeRgb = hexToRgb(activeColor);

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Handle high DPI displays to avoid blur
      const dpi = window.devicePixelRatio || 1;
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      ctx.scale(dpi, dpi);

      dots = [];
      // Populate nodes across entire window
      for (let x = 0; x < width + gap; x += gap) {
        for (let y = 0; y < height + gap; y += gap) {
          dots.push({
            originX: x,
            originY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        const dx = mx - dot.x;
        const dy = my - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interactive gravity/physics hook
        if (dist < proximity) {
          const force = (proximity - dist) / proximity;
          dot.vx -= (dx / dist) * force * 0.5;
          dot.vy -= (dy / dist) * force * 0.5;
        }

        // Return forces
        const dxOrigin = dot.originX - dot.x;
        const dyOrigin = dot.originY - dot.y;
        
        dot.vx += dxOrigin * (1 / resistance);
        dot.vy += dyOrigin * (1 / resistance);

        // Apply friction
        dot.vx *= 0.9;
        dot.vy *= 0.9;

        // Apply calculated velocity
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Determine active/blending color mapping
        const totalDisp = Math.abs(dxOrigin) + Math.abs(dyOrigin);
        const isActive = dist < proximity || totalDisp > 1;
        
        let r, g, b, alpha;
        if (isActive) {
          const ratio = Math.min(1, Math.max(0, (totalDisp / (shockStrength * 4)) + (proximity - dist > 0 ? (proximity - dist)/proximity : 0)));
          r = Math.floor(baseRgb.r + (activeRgb.r - baseRgb.r) * ratio);
          g = Math.floor(baseRgb.g + (activeRgb.g - baseRgb.g) * ratio);
          b = Math.floor(baseRgb.b + (activeRgb.b - baseRgb.b) * ratio);
          alpha = Math.min(1, 0.2 + ratio); // Fade logic
        } else {
          r = baseRgb.r; g = baseRgb.g; b = baseRgb.b; alpha = 0.2;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        // Dot form mapping
        ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onMouseLeave = () => {
      mx = -1000;
      my = -1000;
    };

    const onClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      
      dots.forEach((dot) => {
        const dx = cx - dot.x;
        const dy = cy - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < shockRadius) {
          const force = (shockRadius - dist) / shockRadius;
          dot.vx -= (dx / dist) * force * shockStrength * 5;
          dot.vy -= (dy / dist) * force * shockStrength * 5;
        }
      });
    };

    init();
    animate();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength, resistance]);

  // Don't render anything on mobile
  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}

