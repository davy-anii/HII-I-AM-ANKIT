"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050510]">
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.05)_0%,rgba(5,5,16,1)_100%)]" />

      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-blue/10 blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-neon-purple/10 blur-[120px]"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
