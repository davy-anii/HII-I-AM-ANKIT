"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Award, Code, Zap } from "lucide-react";

const socials = [
  {
    icon: <Mail size={18} />,
    label: "Email Me",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ankit06.karmakar@gmail.com",
    bg: "#FF70A6",
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    href: "https://linkedin.com",
    bg: "#FBFF48",
  },
  {
    icon: <Github size={18} />,
    label: "GitHub",
    href: "https://github.com",
    bg: "#33FF57",
  },
];

const stats = [
  { icon: <Award size={24} />, value: "4+", label: "Hackathon Wins", bg: "#FBFF48" },
  { icon: <Code size={24} />, value: "10+", label: "Projects Built", bg: "#FF70A6" },
  { icon: <Zap size={24} />, value: "Fast", label: "Prototyping", bg: "#33FF57" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section bg-[#FFFDF5]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50">
            /CONTACT
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-4 sm:mb-6 leading-tight">
            Let&apos;s<br />Connect
          </h2>
          <p className="max-w-xl mx-auto mb-8 sm:mb-12 text-xs sm:text-sm leading-relaxed opacity-70 px-2">
            I&apos;m currently looking for new opportunities. Whether you have a question or
            just want to say hi, I&apos;ll get back to you!
          </p>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-color={s.bg}
                className="cursor-target inline-flex items-center justify-center gap-2 px-6 py-3 border-4 border-black font-black text-sm uppercase hard-shadow hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all w-full sm:w-auto"
                style={{ backgroundColor: s.bg }}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg sm:max-w-2xl mx-auto">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                data-cursor-color={stat.bg}
                className="cursor-target flex flex-col items-center gap-1 sm:gap-2 border-4 border-black p-3 sm:p-6 hard-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                style={{ backgroundColor: stat.bg }}
              >
                <span className="hidden sm:block">{stat.icon}</span>
                <span className="text-2xl sm:text-4xl font-black">{stat.value}</span>
                <span className="text-xs font-bold uppercase tracking-tight sm:tracking-wider text-center leading-tight">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
