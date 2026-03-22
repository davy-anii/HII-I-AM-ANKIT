"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  logo?: React.ReactNode | string;
  logoAlt?: string;
  items: NavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  theme?: "light" | "dark";
  initialLoadAnimation?: boolean;
}

export default function PillNav({
  logo,
  logoAlt = "Logo",
  items,
  activeHref = "/",
  className = "",
  ease = "easeOut", // mapped to standard tween
  baseColor = "rgba(0,0,0,0.5)",
  pillColor = "var(--color-accent)",
  hoveredPillTextColor = "#000000",
  pillTextColor = "#ffffff",
  theme = "dark",
  initialLoadAnimation = false,
}: PillNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState(false);
  const [currentActive, setCurrentActive] = useState(activeHref);
  
  // Handle sync with scrolling / hash
  useEffect(() => {
    setCurrentActive(window.location.hash || activeHref);
    const handleHashChange = () => {
      setCurrentActive(window.location.hash || activeHref);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activeHref]);

  const transition = { type: "tween" as const, ease: "easeOut" as const, duration: 0.3 };
  
  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all max-w-fit ${className}`}>
      {/* Desktop Pill Nav */}
      <motion.div 
        initial={initialLoadAnimation ? { y: -50, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:flex flex-nowrap items-center justify-between gap-1 p-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-2xl"
        style={{ backgroundColor: baseColor }}
      >
        {logo && (
          <div className="pl-4 pr-3 flex items-center shrink-0">
            {typeof logo === 'string' ? (
              <img src={logo} alt={logoAlt} className="h-5 w-auto" />
            ) : (
              logo
            )}
          </div>
        )}
        
        <div className="flex items-center gap-0.5 shrink-0">
          {items.map((item, index) => {
            const isActive = currentActive === item.href;
            const isHovered = hoveredIndex === index;
            
            return (
              <Link
                key={index}
                href={item.href}
                className="relative px-4 py-1.5 rounded-full text-[13px] font-bold transition-all z-10 whitespace-nowrap"
                style={{
                  color: isActive || isHovered ? hoveredPillTextColor : pillTextColor,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setCurrentActive(item.href)}
              >
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="nav-pill-hover"
                    className="absolute inset-0 rounded-full z-[-1] opacity-40"
                    style={{ backgroundColor: pillColor }}
                    transition={transition}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill-active"
                    className="absolute inset-0 rounded-full z-[-1] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    style={{ backgroundColor: pillColor }}
                    transition={transition}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>
      
      {/* Mobile Nav Header */}
      <div className="md:hidden flex justify-between items-center p-4 rounded-full backdrop-blur-md border border-white/10 shadow-2xl" style={{ backgroundColor: baseColor }}>
        {logo && (
          <div className="font-bold text-white px-2">
            {typeof logo === 'string' ? <img src={logo} alt={logoAlt} className="h-6" /> : logo}
          </div>
        )}
        <button onClick={() => setActiveMenu(!activeMenu)} className="text-white p-2 rounded-full hover:bg-white/10 transition-colors">
          {activeMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-4 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 flex flex-col p-4 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            style={{ backgroundColor: baseColor }}
          >
            {items.map((item, index) => {
              const isActive = currentActive === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`px-6 py-4 rounded-xl transition-colors font-bold text-lg mb-2 ${
                    isActive ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]" : "text-white hover:bg-white/5"
                  }`}
                  onClick={() => {
                    setCurrentActive(item.href);
                    setActiveMenu(false);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
