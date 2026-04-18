"use client";

import { motion } from "framer-motion";
import { Search, Tags, Rocket, Link2, Bot, FileText } from "lucide-react";

const seoCards = [
  {
    title: "Keywords",
    points: ["Ankit Karmakar", "Full Stack Developer Portfolio", "MERN Stack Developer"],
    bg: "#FF8C00",
    icon: <Tags size={18} />,
  },
  {
    title: "Meta Titles & Descriptions",
    points: ["Clear page title", "Search-focused description", "Better Google understanding"],
    bg: "#3B5BFF",
    icon: <Search size={18} />,
  },
  {
    title: "Fast Website",
    points: ["Optimized metadata", "Clean crawl signals", "Performance-aware structure"],
    bg: "#A855F7",
    icon: <Rocket size={18} />,
  },
  {
    title: "Links Matter",
    points: ["GitHub + LinkedIn", "Strong profile authority", "Better discoverability"],
    bg: "#F59E0B",
    icon: <Link2 size={18} />,
  },
];

export default function SeoSection() {
  return (
    <section id="seo" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section bg-[#FFFDF5]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50">/SEO</p>
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase leading-tight">
              Get Found, Not Ignored
            </h2>
            <span className="block text-sm font-bold opacity-60 mt-1 uppercase">
              Search + AI discoverability strategy built into this portfolio.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
            {seoCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-4 border-black hard-shadow p-4 sm:p-5"
                style={{ backgroundColor: card.bg }}
              >
                <div className="inline-flex items-center gap-2 border-2 border-black bg-black text-white px-2 py-1 text-[11px] font-black uppercase mb-3">
                  {card.icon}
                  Active
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase mb-2 leading-tight">{card.title}</h3>
                <ul className="text-xs sm:text-sm font-bold leading-relaxed space-y-1">
                  {card.points.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="border-4 border-black hard-shadow bg-[#FBFF48] p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 border-2 border-black bg-black text-[#FBFF48] px-3 py-1 text-xs font-black uppercase mb-3">
                <FileText size={16} />
                robots.txt + sitemap.xml
              </div>
              <p className="text-sm sm:text-base font-bold leading-relaxed">
                robots.txt guides search crawlers and sitemap.xml helps them index key sections quickly.
                This improves visibility on Google and Bing.
              </p>
            </div>

            <div className="border-4 border-black hard-shadow bg-[#D6B2FF] p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 border-2 border-black bg-black text-white px-3 py-1 text-xs font-black uppercase mb-3">
                <Bot size={16} />
                llms.txt for AI Crawlers
              </div>
              <p className="text-sm sm:text-base font-bold leading-relaxed">
                llms.txt gives AI systems structured context about identity, tech stack, projects,
                and achievements, so answers about this portfolio stay accurate.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
