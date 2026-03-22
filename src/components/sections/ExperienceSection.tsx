"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section bg-[#FFFDF5]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50">
            /EXPERIENCE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase mb-8 sm:mb-12 leading-tight">
            Experience
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            data-cursor-color="#FBFF48"
            className="cursor-target border-4 border-black hard-shadow-lg bg-white hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
          >
            {/* Header bar */}
            <div className="border-b-4 border-black bg-black text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-black uppercase">App &amp; IoT Associate</h3>
                <p className="text-[#FBFF48] font-bold text-xs sm:text-sm mt-0.5">@ RCCTechz</p>
              </div>
              <span className="border-2 border-[#FBFF48] text-[#FBFF48] px-3 py-1 text-xs font-black uppercase tracking-wider w-fit">
                Present
              </span>
            </div>

            {/* Responsibilities */}
            <ul className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {[
                "Developing scalable and efficient mobile applications.",
                "Working on IoT-based real-world solutions bridging hardware and software.",
                "Collaborating in technical teams to design, iterate, and ship products effectively.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm leading-relaxed">
                  <ChevronRight size={16} className="shrink-0 mt-0.5 text-black" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
