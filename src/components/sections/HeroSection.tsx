"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Trophy } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 relative dot-bg"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center lg:items-start">

        {/* Avatar — mobile top, hidden on lg (shown right side) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center lg:hidden w-full"
        >
          <div 
            className="w-48 sm:w-60 cursor-target group transition-transform hover:-translate-y-2" 
            style={{ boxShadow: '8px 8px 0 0 #000' }}
            data-cursor-color="#FBFF48"
          >
            <div className="border-4 border-black overflow-hidden w-48 h-52 sm:w-60 sm:h-68">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.postimg.cc/y8J30VFX/Whats-App-Image-2026-03-19-at-21-21-50.jpg"
                alt="Ankit Karmakar"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="border-4 border-t-0 border-black bg-black text-[#FBFF48] font-black py-2 px-3 text-center text-xs uppercase tracking-wider">
              App &amp; IoT Developer @ RCCTechz
            </div>
            {/* Technical ID Card Identifier */}
            <div className="border-4 border-t-0 border-black bg-white p-2 flex justify-between items-center group-hover:bg-[#FFFDF5] transition-colors">
              <div className="flex gap-[2px] h-5 items-end opacity-80">
                <div className="w-1 h-full bg-black"></div>
                <div className="w-2 h-[80%] bg-black"></div>
                <div className="w-1 h-[60%] bg-black"></div>
                <div className="w-2 h-full bg-black"></div>
                <div className="w-[1px] h-full bg-black"></div>
                <div className="w-1 h-[90%] bg-black"></div>
                <div className="w-[3px] h-full bg-black"></div>
              </div>
              <div className="text-[8px] font-black tracking-widest uppercase">ID: AK-01</div>
            </div>
          </div>
        </motion.div>

        {/* Left Text Content */}
        <div className="flex flex-col items-start z-10 w-full">

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            data-cursor-color="#33FF57"
            className="cursor-target inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 border-2 border-black bg-[#33FF57] font-black text-xs sm:text-sm uppercase hard-shadow"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse inline-block" />
            Open to Work
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-3 sm:mb-4 uppercase"
          >
            <span>HI, I'M</span>
            <br />
            <span className="bg-[#FBFF48] border-2 border-black hard-shadow px-2 sm:px-4 py-1 inline-block mt-2 text-center text-black">
              ANKIT KARMAKAR
            </span>
          </motion.h1>

          {/* Brutalist Role Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col items-start mt-8 mb-6 sm:mb-10 w-full"
          >
            {/* Tilted System Status Badge */}
            <div className="absolute -top-5 left-10 sm:left-16 rotate-[-4deg] z-10 w-max">
              <div className="bg-white border-2 border-black hard-shadow-sm px-2 py-1 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#33FF57] border border-black animate-pulse" />
                <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase">System Status: Online</span>
              </div>
            </div>

            {/* FRONTEND */}
            <div className="text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-black w-full">
              FRONTEND
            </div>
            
            {/* DEVELOPER */}
            <div
              className="text-[11.5vw] sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-transparent w-full mt-1"
              style={{ WebkitTextStroke: '2px black' }}
            >
              DEVELOPER
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-2 text-sm font-semibold mb-6 sm:mb-8"
          >
            <MapPin size={15} />
            Kolkata, India
          </motion.div>

          {/* Achievement Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10"
          >
            {["4× Hackathon Winner", "DoubleSlash 4.0", "NextGen Hacks"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 border-2 border-black bg-[#FF70A6] font-bold text-xs sm:text-sm hard-shadow-sm"
              >
                <Trophy size={12} />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <a
              href="#projects"
              data-cursor-color="#FBFF48"
              className="cursor-target flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-black text-[#FBFF48] font-black text-sm sm:text-base uppercase border-2 border-black hard-shadow hover-btn transition-colors w-full sm:w-auto"
            >
              View My Work <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              data-cursor-color="#FF70A6"
              className="cursor-target flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-[#FBFF48] text-black font-black text-sm sm:text-base uppercase border-2 border-black hard-shadow hover-btn hover:bg-[#FF70A6] transition-colors w-full sm:w-auto relative"
            >
              Hire Me <span className="w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
            </a>
          </motion.div>
        </div>

        {/* Right Avatar — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex justify-center items-center"
        >
          <div 
            className="relative w-fit cursor-target group transition-transform hover:-translate-y-2"
            data-cursor-color="#FBFF48"
          >
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-black z-0" />
            <div className="relative z-10 border-4 border-black overflow-hidden w-72 h-80 md:w-80 md:h-96">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.postimg.cc/y8J30VFX/Whats-App-Image-2026-03-19-at-21-21-50.jpg"
                alt="Ankit Karmakar"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="relative z-10 border-4 border-t-0 border-black bg-black text-[#FBFF48] font-black py-3 px-4 text-center text-sm uppercase tracking-widest">
              App &amp; IoT Developer @ RCCTechz
            </div>
            {/* Technical ID Card Barcode */}
            <div className="relative z-10 border-4 border-t-0 border-black bg-white p-2 flex justify-between items-center group-hover:bg-[#FFFDF5] transition-colors">
              <div className="flex gap-[3px] h-7 items-end opacity-90">
                <div className="w-1 h-full bg-black"></div>
                <div className="w-2 h-[80%] bg-black"></div>
                <div className="w-[2px] h-full bg-black"></div>
                <div className="w-3 h-full bg-black"></div>
                <div className="w-[2px] h-[60%] bg-black"></div>
                <div className="w-2 h-full bg-black"></div>
                <div className="w-1 h-[90%] bg-black"></div>
                <div className="w-[4px] h-full bg-black"></div>
                <div className="w-1 h-full bg-black"></div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[12px] font-black uppercase tracking-tighter leading-none text-black">AUTH_ID: 94X</span>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mt-1">VERIFIED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
