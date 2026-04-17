"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Award, Code, Zap } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const socials = [
  {
    icon: <Mail size={18} />,
    label: "Email Me",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ankitkarmakar200512@gmail.com",
    bg: "#FF70A6",
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ankit-karmakar-399760372/",
    bg: "#FBFF48",
  },
  {
    icon: <Github size={18} />,
    label: "GitHub",
    href: "https://github.com/davy-anii",
    bg: "#33FF57",
  },
];

const stats = [
  { icon: <Award size={24} />, value: "4+", label: "Hackathon Wins", bg: "#FBFF48" },
  { icon: <Code size={24} />, value: "10+", label: "Projects Built", bg: "#FF70A6" },
  { icon: <Zap size={24} />, value: "Fast", label: "Prototyping", bg: "#33FF57" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const [web3Response] = await Promise.all([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            ...formData,
          }),
        }),
        new Promise((resolve) => setTimeout(resolve, 2000)) // Enforce 2s loading animation
      ]);

      const web3Result = await web3Response.json();

      if (!web3Result.success) {
        throw new Error(web3Result.message || "Failed to submit to Web3Forms.");
      }

      addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
      }).catch(console.error);

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative neo-section bg-[#FFFDF5]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50">
            /CONTACT
          </p>
          <div className="mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-tight">
              Let&apos;s<br />Connect
            </h2>
            <span className="block text-sm font-bold opacity-60 mt-3 uppercase max-w-xl mx-auto px-2">
              I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll get back to you!
            </span>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-16 text-left">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border-4 border-black px-4 py-3 bg-white font-bold text-sm focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none hard-shadow transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border-4 border-black px-4 py-3 bg-white font-bold text-sm focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none hard-shadow transition-all"
              />
              <textarea
                name="message"
                placeholder="YOUR MESSAGE"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full border-4 border-black px-4 py-3 bg-white font-bold text-sm focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none hard-shadow transition-all resize-y"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="cursor-target w-full bg-[#33FF57] border-4 border-black px-6 py-4 font-black text-sm uppercase hard-shadow hover-btn disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex justify-center items-center gap-2"
              >
                {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}
              </button>

              {status === "success" && (
                <div className="bg-[#FBFF48] border-4 border-black p-3 font-bold text-sm text-center hard-shadow-sm uppercase">
                  MESSAGE SENT SUCCESSFULLY!
                </div>
              )}
              {status === "error" && (
                <div className="bg-[#FF70A6] border-4 border-black p-3 font-bold text-sm text-center hard-shadow-sm uppercase text-black">
                  FAILED TO SEND. TRY AGAIN.
                </div>
              )}
            </div>
          </form>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                onClick={(e) => {
                  if (s.label === "Email Me") {
                    e.preventDefault();
                    const width = 600;
                    const height = 650;
                    const left = (window.innerWidth - width) / 2;
                    const top = (window.screen.height - height) / 2;
                    window.open(
                      s.href,
                      "GmailCompose",
                      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
                    );
                  }
                }}
                target={s.label === "Email Me" ? undefined : "_blank"}
                rel={s.label === "Email Me" ? undefined : "noreferrer"}
                data-cursor-color={s.bg}
                className="cursor-target inline-flex items-center justify-center gap-2 px-6 py-3 border-4 border-black font-black text-sm uppercase hard-shadow hover-btn w-full sm:w-auto"
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
                className="cursor-target flex flex-col items-center gap-1 sm:gap-2 border-4 border-black p-3 sm:p-6 hard-shadow hover-card transition-all"
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
