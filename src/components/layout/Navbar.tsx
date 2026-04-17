"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b-2 border-black transition-all duration-300 ${
        scrolled ? "bg-[#FFFDF5]" : "bg-[#FFFDF5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" className="cursor-target text-xl font-black tracking-tight">
          Ankit<span className="text-[#FBFF48] bg-black px-1 ml-0.5">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="cursor-target px-4 py-2 font-bold text-sm uppercase tracking-wide border-l-2 border-black hover:bg-black hover:text-[#FBFF48] transition-colors duration-150 first:border-l-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <MobileMenu />
      </div>
    </motion.header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="cursor-target border-2 border-black p-2 font-black hard-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all bg-white"
        title="Menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 right-0 bg-[#FFFDF5] border-b-2 border-black flex flex-col"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="cursor-target px-6 py-4 font-bold text-sm uppercase tracking-wide border-b-2 border-black hover:bg-black hover:text-[#FBFF48] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </div>
  );
}
