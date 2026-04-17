"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const techStack = [
  // LANGUAGES
  { category: "LANGUAGES", title: "HTML5 / CSS3", icon: "https://cdn.simpleicons.org/html5/white", level: "LVL_09" },
  { category: "LANGUAGES", title: "JAVASCRIPT", icon: "https://cdn.simpleicons.org/javascript/white", level: "LVL_08" },
  { category: "LANGUAGES", title: "TYPESCRIPT", icon: "https://cdn.simpleicons.org/typescript/white", level: "LVL_07" },
  { category: "LANGUAGES", title: "C++", icon: "https://cdn.simpleicons.org/cplusplus/white", level: "LVL_08" },
  { category: "LANGUAGES", title: "JAVA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", invert: true, level: "LVL_07" },
  { category: "LANGUAGES", title: "PYTHON", icon: "https://cdn.simpleicons.org/python/white", level: "LVL_06" },

  // SOFTWARE & WEB
  { category: "SOFTWARE & WEB", title: "REACT", icon: "https://cdn.simpleicons.org/react/white", level: "LVL_09" },
  { category: "SOFTWARE & WEB", title: "NEXT.JS", icon: "https://cdn.simpleicons.org/nextdotjs/white", level: "LVL_08" },
  { category: "SOFTWARE & WEB", title: "NODE.JS", icon: "https://cdn.simpleicons.org/nodedotjs/white", level: "LVL_07" },
  { category: "SOFTWARE & WEB", title: "EXPRESS.JS", icon: "https://cdn.simpleicons.org/express/white", level: "LVL_07" },
  { category: "SOFTWARE & WEB", title: "TAILWIND CSS", icon: "https://cdn.simpleicons.org/tailwindcss/white", level: "LVL_09" },

  // TOOLS & DB
  { category: "TOOLS & DB", title: "FIREBASE", icon: "https://cdn.simpleicons.org/firebase/white", level: "LVL_08" },
  { category: "TOOLS & DB", title: "SUPABASE", icon: "https://cdn.simpleicons.org/supabase/white", level: "LVL_07" },
  { category: "TOOLS & DB", title: "POSTGRESQL", icon: "https://cdn.simpleicons.org/postgresql/white", level: "LVL_06" },
  { category: "TOOLS & DB", title: "MONGODB", icon: "https://cdn.simpleicons.org/mongodb/white", level: "LVL_07" },
  { category: "TOOLS & DB", title: "GIT / GITHUB", icon: "https://cdn.simpleicons.org/github/white", level: "LVL_08" },
  { category: "TOOLS & DB", title: "DOCKER", icon: "https://cdn.simpleicons.org/docker/white", level: "LVL_05" },
];

const categories = ["LANGUAGES", "SOFTWARE & WEB", "TOOLS & DB"];

export default function TechStackSection() {
  const [activeCat, setActiveCat] = useState("LANGUAGES");

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section dot-bg text-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Info Bar */}
          <div className="flex items-center justify-between mb-8 sm:mb-10 w-full">
            <div className="bg-black text-[#33FF57] text-[10px] sm:text-xs font-black px-2 py-1 uppercase tracking-widest border border-black">
              SYSTEM_SCAN: ACTIVE
            </div>
            <div className="text-[10px] text-gray-400 tracking-widest uppercase">
              MODULE_LOAD: V2.42
            </div>
          </div>

          {/* Huge Main Headline */}
          <div className="relative mb-12 sm:mb-16">
            <h2 
              className="text-6xl sm:text-8xl md:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter"
              style={{
                color: activeCat === "LANGUAGES" ? "#33FF57" : activeCat === "SOFTWARE & WEB" ? "#FF6200" : "#00F0FF",
                WebkitTextStroke: '3px black'
              }}
            >
              MY STACK
            </h2>
            
            <div 
              className="inline-block bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-black uppercase tracking-widest border-b-4 -rotate-2 mt-4 ml-2 sm:ml-4"
              style={{ borderColor: activeCat === "LANGUAGES" ? "#33FF57" : activeCat === "SOFTWARE & WEB" ? "#FF6200" : "#00F0FF" }}
            >
              A COMPREHENSIVE OVERVIEW OF MY TECHNOLOGICAL LOADOUT.
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap bg-black p-2 gap-2 border-b-4 w-fit mb-12"
               style={{ borderColor: activeCat === "LANGUAGES" ? "#33FF57" : activeCat === "SOFTWARE & WEB" ? "#FF6200" : "#00F0FF" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`cursor-target px-4 sm:px-6 py-2 font-black text-xs sm:text-sm uppercase tracking-widest transition-all ${
                  activeCat === cat
                    ? "text-black border-2 border-white"
                    : "text-gray-400 hover:text-white border-2 border-transparent"
                }`}
                style={{ 
                  backgroundColor: activeCat === cat 
                    ? (cat === "LANGUAGES" ? "#33FF57" : cat === "SOFTWARE & WEB" ? "#FF6200" : "#00F0FF") 
                    : "transparent"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {techStack
              .filter((tech) => tech.category === activeCat)
              .map((tech, idx) => (
                <motion.div
                  key={tech.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`bg-white border-4 border-black hard-shadow flex items-center p-3 gap-4 group hover:-translate-y-1 transition-all duration-200 cursor-none ${
                    activeCat === "LANGUAGES" ? "hover:bg-[#33FF57]" :
                    activeCat === "SOFTWARE & WEB" ? "hover:bg-[#FF6200]" :
                    "hover:bg-[#00F0FF]"
                  }`}
                >
                  <div className="w-14 h-14 bg-black flex-shrink-0 flex items-center justify-center p-2.5 transition-transform group-hover:scale-110">
                    <img 
                      src={tech.icon} 
                      alt={tech.title}
                      className={`w-8 h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity ${tech.invert ? 'brightness-0 invert' : ''}`} 
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold tracking-widest mb-0.5">
                      {tech.level}
                    </div>
                    <div className="text-sm sm:text-base font-black uppercase tracking-tight text-black">
                      {tech.title}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
