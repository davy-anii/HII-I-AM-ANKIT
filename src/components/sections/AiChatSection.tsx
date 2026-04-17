"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export default function AiChatSection() {
  const handleOpenAi = () => {
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  };

  return (
    <section id="ai" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section bg-[#33FF57]">
      <div className="max-w-4xl mx-auto border-8 border-black hard-shadow bg-white p-8 sm:p-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 opacity-70 sm:opacity-90 rotate-6 pointer-events-none select-none z-0">
          <img
            src="https://i.postimg.cc/FKYd4qyJ/image.png"
            alt="AI Core Logo"
            className="w-[180px] sm:w-[280px] md:w-[340px] h-auto object-contain drop-shadow-[5px_5px_0_rgba(0,0,0,1)] mix-blend-multiply"
            loading="lazy"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-black" size={24} />
            <span className="text-sm font-black uppercase tracking-widest text-black">
              /INTELLIGENCE
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase leading-tight text-black mb-6">
            MEET MY AI.
          </h2>

          <p className="text-base sm:text-lg font-bold text-black opacity-80 max-w-xl mb-10 leading-relaxed">
            I built a custom LLM algorithm using Google Gemini that is entirely trained on my resume. You can interrogate the AI right now to learn about my projects, my tech stack, or even send me an email securely.
          </p>

          <button
            onClick={handleOpenAi}
            className="cursor-target inline-flex items-center gap-3 bg-black text-[#FBFF48] px-8 py-4 font-black text-lg uppercase border-4 border-black hover:bg-transparent hover:text-black transition-colors hard-shadow hover-btn"
          >
            <Bot size={24} />
            ACTIVATE SYSTEM_AI
          </button>
        </motion.div>
      </div>
    </section>
  );
}
