import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black text-white py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-black text-sm uppercase tracking-widest">
            Ankit<span className="text-[#FBFF48]">.</span>Karmakar
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/davy-anii" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase hover:text-[#FBFF48] transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/ankit-karmakar-399760372/" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase hover:text-[#FBFF48] transition-colors">LinkedIn</a>
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center justify-center gap-1.5 flex-wrap text-center max-w-sm md:max-w-none">
          © {new Date().getFullYear()} — HANDCRAFTED IN KOLKATA • FUELED BY <Coffee size={14} /> &amp; LATE NIGHTS
        </p>

        <a
          href="#hero"
          className="cursor-target border-2 border-[#FBFF48] text-[#FBFF48] px-4 py-2 text-xs font-black uppercase tracking-wider hover:bg-[#FBFF48] hover:text-black transition-colors shrink-0"
        >
          Back to Top ↑
        </a>
      </div>
    </footer>
  );
}
