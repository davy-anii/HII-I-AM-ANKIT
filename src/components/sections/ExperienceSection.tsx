"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section bg-[#FFFDF5]">
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50">
            /EXPERIENCE
          </p>
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase leading-tight">
              Chronology
            </h2>
            <span className="block text-sm font-bold opacity-60 mt-1 uppercase">A timeline of my professional contributions.</span>
          </div>

          <div className="relative mt-12 sm:mt-16">
            {/* Vertical Base Line */}
            <div className="absolute left-[20px] sm:left-[36px] top-6 bottom-6 w-[6px] sm:w-[8px] bg-black z-0 rounded-full" />

            <div className="space-y-12 sm:space-y-16">
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                data-cursor-color="#FBFF48"
                className="relative pl-[56px] sm:pl-[96px]"
              >
                {/* Intersecting Dot */}
                <div className="absolute left-[13px] sm:left-[26px] top-5 sm:top-6 w-5 h-5 sm:w-7 sm:h-7 bg-[#FBFF48] border-4 border-black rounded-full z-10" />
                
                <div className="cursor-target border-4 border-black hard-shadow-lg bg-white hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all">
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
                        <span className="font-medium text-black">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                data-cursor-color="#FBFF48"
                className="relative pl-[56px] sm:pl-[96px]"
              >
                {/* Intersecting Dot */}
                <div className="absolute left-[13px] sm:left-[26px] top-5 sm:top-6 w-5 h-5 sm:w-7 sm:h-7 bg-[#33FF57] border-4 border-black rounded-full z-10" />

                <div className="cursor-target border-4 border-black hard-shadow-lg bg-white hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all">
                  {/* Header bar */}
                  <div className="border-b-4 border-black bg-black text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black uppercase">Tech Team Member</h3>
                      <p className="text-[#FBFF48] font-bold text-xs sm:text-sm mt-0.5">@ RCCIIT ACM Student Chapter</p>
                    </div>
                    <span className="border-2 border-[#FBFF48] text-[#FBFF48] px-3 py-1 text-xs font-black uppercase tracking-wider w-fit">
                      Present
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <ul className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {[
                      "Building and maintaining technical projects and tools for the ACM student community.",
                      "Collaborating with peers to organise tech events, workshops, and hackathons.",
                      "Contributing to open-source initiatives and knowledge-sharing within the chapter.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm leading-relaxed">
                        <ChevronRight size={16} className="shrink-0 mt-0.5 text-black" />
                        <span className="font-medium text-black">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
