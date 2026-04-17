"use client";

import { motion } from "framer-motion";
import { Eye, Briefcase, Trophy, ShieldCheck } from "lucide-react";

export default function CVSection() {
  return (
    <section id="resume" className="py-20 sm:py-32 px-4 sm:px-6 relative bg-[#FBFF48] border-y-4 border-black overflow-hidden dot-bg">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start justify-between">

          {/* Left: Massive Typography / Pitch */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border-2 border-black bg-white font-black text-xs uppercase hard-shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF70A6] animate-pulse inline-block" />
              Interview Ready
            </div>

            <h2 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-black mb-6">
              HIRE <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>ME.</span>
            </h2>

            <p className="text-lg sm:text-xl font-bold border-l-4 border-black pl-4 mb-10 max-w-xl">
              I build scalable mobile apps, robust backends, and beautiful brutalist interfaces. Fast learner, hackathon veteran, and ready to ship production code.
            </p>

            <div className="flex flex-col md:flex-row gap-6">



              <a
                href="https://drive.google.com/file/d/1DZe9Ge0atHmgjULkQw3OkNeCRk1qok6d/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-color="#FF70A6"
                className="cursor-target group inline-flex items-center justify-center gap-2 px-10 py-5 bg-black text-white font-black text-xl uppercase border-4 border-black hard-shadow hover:bg-[#FF70A6] hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full sm:w-auto"
              >
                <Eye size={24} strokeWidth={3} className="text-[#33FF57] group-hover:text-black transition-colors" /> VIEW CV
              </a>
            </div>
          </motion.div>

          {/* Right: Quick Stats / TL;DR for Recruiters */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="bg-white border-4 border-black hard-shadow p-6 sm:p-10 relative">
              <div className="absolute -top-5 -right-5 bg-[#33FF57] border-2 border-black px-4 py-2 font-black text-sm uppercase transform rotate-6 hard-shadow-sm">
                TL;DR
              </div>

              <h3 className="text-2xl font-black uppercase mb-8 border-b-4 border-black pb-4">
                The 30-Second Pitch
              </h3>

              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="bg-black text-[#FBFF48] p-2 mt-1">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg uppercase">Full Stack Expertise</h4>
                    <p className="text-sm font-semibold opacity-80">React, React Native, Next.js, Node.js, Firebase, MongoDB.</p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="bg-black text-[#FF70A6] p-2 mt-1">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg uppercase">4x Hackathon Winner</h4>
                    <p className="text-sm font-semibold opacity-80">Proven ability to build MVPs, work under pressure, and deliver results in 24 hours.</p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="bg-black text-[#33FF57] p-2 mt-1">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg uppercase">Production Ready</h4>
                    <p className="text-sm font-semibold opacity-80">Experience building complete apps with role-based auth, secure DBs, and seamless UI/UX.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
