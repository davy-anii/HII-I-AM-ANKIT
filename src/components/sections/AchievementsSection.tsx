"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star } from "lucide-react";
import SwipeCards from "@/components/ui/SwipeCards";

const achievements = [
  { title: "Winner – DoubleSlash 4.0", org: "IEEE Jadavpur University", icon: <Trophy size={18} />, bg: "#FBFF48" },
  { title: "Winner – NextGen Hacks", org: "Calcutta University", icon: <Trophy size={18} />, bg: "#FBFF48" },
  { title: "4× Hackathon Winner", org: "Multiple Events", icon: <Award size={18} />, bg: "#FF70A6" },
  { title: "Best App Track", org: "ShowcaseX", icon: <Star size={18} />, bg: "#33FF57" },
  { title: "GitLinked Certification", org: "RCCTechz", icon: <Award size={18} />, bg: "#33FF57" },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section bg-[#FBFF48]">
      <div className="max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50">
            /ACHIEVEMENTS
          </p>
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase leading-tight">
              Achievements
            </h2>
            <span className="block text-sm font-bold opacity-60 mt-1 uppercase">Milestones and competitive wins.</span>
          </div>

          {/* Achievement List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-16">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                data-cursor-color={item.bg}
                className="cursor-target flex items-center gap-3 sm:gap-4 border-4 border-black px-3 sm:px-5 py-3 sm:py-4 bg-white hard-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <div
                  className="shrink-0 border-2 border-black p-1.5 sm:p-2"
                  style={{ backgroundColor: item.bg }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-sm sm:text-base uppercase leading-tight truncate">{item.title}</h3>
                  <p className="text-xs mt-0.5 opacity-60 font-semibold">{item.org}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Swipe Cards */}
          <div className="border-4 border-black hard-shadow-lg bg-white p-3 sm:p-4 overflow-hidden">
            <p className="text-xs font-black uppercase tracking-widest mb-3 sm:mb-4 text-center opacity-50">
              Swipe to explore moments →
            </p>
            <SwipeCards />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
