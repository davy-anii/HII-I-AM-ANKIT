"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  avatarUrl: string;
  showUserInfo: boolean;
  enableTilt: boolean;
  enableMobileTilt: boolean;
  onContactClick?: () => void;
  behindGlowColor?: string;
  iconUrl?: string;
  behindGlowEnabled?: boolean;
  innerGradient?: string;
}

export default function ProfileCard({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  behindGlowColor = "rgba(125, 190, 255, 0.67)",
  iconUrl,
  behindGlowEnabled = true,
  innerGradient = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)",
}: ProfileCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!enableTilt) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Disable on small devices unless overridden
    if (!enableMobileTilt && typeof window !== "undefined" && window.innerWidth < 768) return;

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative group w-full max-w-[320px] mx-auto cursor-target" style={{ perspective: "1000px" }}>
      {/* Background Glow */}
      {behindGlowEnabled && (
        <div 
          className="absolute -inset-1 blur-3xl opacity-50 rounded-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: behindGlowColor }}
        />
      )}

      {/* Tilt Container */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
          background: innerGradient
        }}
        className="relative flex flex-col items-center p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Optional Pattern Overlay */}
        {iconUrl && (
          <div 
            className="absolute inset-0 opacity-20 bg-repeat mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url(${iconUrl})` }}
          />
        )}

        {/* Avatar Layer */}
        <div 
          className="relative w-36 h-36 rounded-full mb-6 border-2 border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center font-bold text-4xl text-gray-500">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              name.charAt(0)
            )}
          </div>
          {/* Status badge */}
          {status && (
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-black rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
          )}
        </div>

        {/* Text/Info Layer */}
        <div className="text-center z-10 w-full" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-1">{name}</h3>
          <p className="text-[var(--color-accent)] font-medium text-sm mb-4">{title}</p>
          
          {showUserInfo && (
            <div className="w-full px-4 py-3 bg-black/40 rounded-xl border border-white/5 mb-6 text-sm text-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>
                <span className="text-green-400 font-medium">{status}</span>
              </div>
            </div>
          )}

          <button 
            onClick={onContactClick}
            className="cursor-target w-full py-3 px-6 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            {contactText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
