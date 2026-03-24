"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!isMobile) {
      const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", updateMousePosition);
      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener('resize', checkMobile);
      };
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full mix-blend-screen z-0 opacity-40 blur-[100px]"
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      style={{
        background: "radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, rgba(138, 43, 226, 0.2) 40%, rgba(5, 5, 16, 0) 70%)"
      }}
    />
  );
}
