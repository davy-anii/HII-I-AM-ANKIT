export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black text-white py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-black text-sm uppercase tracking-widest">
          Ankit<span className="text-[#FBFF48]">.</span>Karmakar
        </p>
        <p className="text-xs font-bold uppercase tracking-wider opacity-50">
          © {new Date().getFullYear()} — HANDCRAFTED IN KOLKATA • FUELED BY ☕ &amp; LATE NIGHTS
        </p>
        <a
          href="#hero"
          className="cursor-target border-2 border-[#FBFF48] text-[#FBFF48] px-4 py-2 text-xs font-black uppercase tracking-wider hover:bg-[#FBFF48] hover:text-black transition-colors"
        >
          Back to Top ↑
        </a>
      </div>
    </footer>
  );
}
