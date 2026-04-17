"use client";

import { motion } from "framer-motion";
import { Smartphone, Cpu, Sparkles, MapPin, GraduationCap, Briefcase, Trophy } from "lucide-react";

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
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50">
            /ABOUT
          </p>
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase leading-tight">
              Thinking in Systems.
            </h2>
            <span className="block text-sm font-bold opacity-60 mt-1 uppercase">A systems thinker and full-stack app developer.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Bio */}
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed">
              <p>
                I&apos;m <strong>Ankit Karmakar</strong>. A systems thinker, hackathon veteran, and full-stack app developer.
              </p>
              <p>
                From designing robust backends in Node to architecting high-performance cross-platform applications, I focus on building resilient, scalable systems from the ground up prioritizing real-world execution.
              </p>
              <p className="italic font-bold">
                &quot;Passionate about leveraging AI and IoT to build intelligent, connected solutions.&quot;
              </p>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-4">
                {[
                  { icon: <MapPin size={16} />, text: "Kolkata, India" },
                  { icon: <GraduationCap size={16} />, text: "BCA Student,RCCIIT" },
                  { icon: <Briefcase size={16} />, text: "RCCTechz" },
                  { icon: <Trophy size={16} />, text: "4× Hackathon Winner" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 border-2 border-black px-2 sm:px-3 py-2 bg-white hard-shadow-sm font-semibold text-xs sm:text-sm"
                  >
                    <span className="flex items-center justify-center shrink-0">{item.icon}</span>
                    <span className="truncate">{item.text}</span>
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
