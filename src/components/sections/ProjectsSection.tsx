"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "FOODYcare",
    description: "A food delivery application integrated with NGOs to help distribute surplus food and reduce waste.",
    tech: ["React Native", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/davy-anii/FOODYcare",
    live: "#",
    accent: "#FBFF48",
    image: "https://i.postimg.cc/fTzykwgV/image.png",
    featured: true,
  },
  {
    title: "HACKLINTAKE",
    description: "A scalable mobile app for hackathons. Features role-based access, comprehensive team management, and secure authentication.",
    tech: ["React Native", "Expo", "Firebase", "Zustand"],
    github: "https://github.com/davy-anii/HACKLINTAKE",
    live: "#",
    accent: "#FF70A6",
    image: "https://i.postimg.cc/pXLVRspz/image.png",
    featured: true,
  },
  {
    title: "SHAKTI",
    description: "A comprehensive women's safety website providing instant alerts, location tracking, and emergency resources.",
    tech: ["Next.js", "Node.js", "Tailwind CSS", "MongoDB"],
    github: "https://github.com/davy-anii/SHAKTI",
    live: "#",
    accent: "#33FF57",
    image: "https://i.postimg.cc/XqHbr0pX/image.png",
    featured: false,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section bg-[#FFFDF5]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50">
            /PROJECTS
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase leading-tight">
                Featured Work
              </h2>
              <span className="block text-sm font-bold opacity-60 mt-1 uppercase">Systems architected for real-world execution.</span>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              data-cursor-color="#FBFF48"
              className="cursor-target inline-flex items-center gap-2 border-2 border-black px-4 py-2 font-bold text-xs sm:text-sm uppercase hard-shadow hover-btn bg-white self-start sm:self-auto shrink-0"
            >
              Full Archive <ExternalLink size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex flex-col border-4 border-black hard-shadow hover-card bg-white"
              >
                {/* Colored Header Bar & Featured Badge */}
                <div
                  className="border-b-4 border-black px-4 sm:px-5 py-2.5 sm:py-3 font-black text-xs sm:text-sm uppercase flex justify-between items-center"
                  style={{ backgroundColor: project.accent }}
                >
                  <span>Project {String(i + 1).padStart(2, "0")}</span>
                  {project.featured && (
                    <span className="bg-black text-white px-2 py-0.5 text-[10px] tracking-widest">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Thumbnail Image */}
                <div className="border-b-4 border-black overflow-hidden aspect-video relative bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-black uppercase mb-2 sm:mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 flex-grow opacity-70">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 border-2 border-black text-xs font-bold"
                        style={{ backgroundColor: project.accent }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto w-full">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-color={project.accent}
                      className="cursor-target flex-1 flex items-center justify-center gap-1.5 border-2 border-black px-3 py-2 text-xs font-black uppercase hard-shadow-sm hover-btn bg-black text-white text-center"
                    >
                      <Github size={12} /> GitHub
                    </a>
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
