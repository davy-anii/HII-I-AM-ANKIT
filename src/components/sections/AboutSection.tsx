"use client";

import { motion } from "framer-motion";
import { Smartphone, Cpu, Sparkles } from "lucide-react";

const cards = [
  {
    icon: <Smartphone size={24} />,
    title: "App Dev",
    desc: "Android, React Native, Next.js — building scalable user experiences.",
    bg: "#FBFF48",
  },
  {
    icon: <Cpu size={24} />,
    title: "IoT Solutions",
    desc: "Bridging hardware sensors and cloud systems seamlessly.",
    bg: "#FF70A6",
  },
  {
    icon: <Sparkles size={24} />,
    title: "AI Integration",
    desc: "Leveraging AI APIs and automation to craft intelligent features.",
    bg: "#33FF57",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section bg-[#FFFDF5]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50">
            /ABOUT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase mb-8 sm:mb-12 leading-tight">
            About Me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Bio */}
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>App &amp; IoT Developer</strong> with experience building scalable applications and smart systems. Currently an App &amp; IoT Associate at <strong>RCCTechz</strong>.
              </p>
              <p>
                Skilled in Android, Firebase, and modern JavaScript frameworks, with multiple hackathon wins.
              </p>
              <p>
                Passionate about leveraging AI to build smarter, real-world solutions.
              </p>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-4">
                {[
                  ["📍", "Kolkata, India"],
                  ["🎓", "BCA Student,RCCIIT"],
                  ["💼", "RCCTechz"],
                  ["🏆", "4× Hackathon Winner"],
                ].map(([emoji, text]) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 border-2 border-black px-2 sm:px-3 py-2 bg-white hard-shadow-sm font-semibold text-xs sm:text-sm"
                  >
                    <span>{emoji}</span>
                    <span className="truncate">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Cards */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  data-cursor-color={card.bg}
                  className="cursor-target flex items-start gap-3 sm:gap-4 border-2 border-black p-4 sm:p-5 hard-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  style={{ backgroundColor: card.bg }}
                >
                  <div className="shrink-0 border-2 border-black bg-white p-1.5 sm:p-2 hard-shadow-sm">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase mb-1">{card.title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
