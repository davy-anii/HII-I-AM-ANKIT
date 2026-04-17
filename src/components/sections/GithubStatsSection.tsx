"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GithubData {
  public_repos: number;
  followers: number;
}

export default function GithubStatsSection() {
  const [data, setData] = useState<GithubData | null>(null);
  const [contributions, setContributions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Profile Data
        const profileRes = await fetch("https://api.github.com/users/davy-anii");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setData(profileData);
        }

        // Fetch Contributions
        const contribRes = await fetch("https://github-contributions-api.jogruber.de/v4/davy-anii");
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          let totalContribs = 0;
          if (contribData.total) {
              totalContribs = Object.values(contribData.total).reduce((acc: any, val: any) => acc + val, 0) as number;
          }
          setContributions(totalContribs);
        }

        setLoading(false);
      } catch (err) {
        console.error("GitHub API Error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section 
      id="github" 
      className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden"
      style={{
        backgroundColor: "#f5f5f5",
        backgroundImage: "radial-gradient(#00000040 1px, transparent 1px)",
        backgroundSize: "30px 30px"
      }}
    >
      {/* Background Coordinate Overlay Text */}
      <div className="absolute top-12 left-12 md:top-24 md:left-48 lg:left-80 text-xs font-mono text-neutral-400 leading-relaxed font-bold hidden sm:block">
        COORD_X: 44.092<br />
        COORD_Y: 12.003<br />
        STATUS: NOMINAL
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12 pt-16 sm:pt-0">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1"
          >
            <div className="bg-black text-[#FBFF48] inline-block px-3 py-1 font-black text-[10px] uppercase tracking-widest mb-6 hard-shadow-sm">
              Live Connection
            </div>
            <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2 opacity-50 text-black">
              /TELEMETRY
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[1.05] text-black">
              Global<br />Output
            </h2>
            <span className="block text-sm font-bold opacity-60 mt-4 uppercase max-w-sm text-black border-l-4 border-[#33FF57] pl-4">
              Real-time matrix tracking of my public commits, repositories, and engineering throughput.
            </span>
          </motion.div>

          <div className="flex-1 flex justify-center lg:justify-end">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="w-full sm:w-[600px]"
        >
          {/* Main Card Component */}
          <div className="bg-[#111111] text-[#33FF57] p-8 sm:p-10 border-8 border-black shadow-[16px_16px_0_rgba(0,0,0,1)] flex flex-col font-mono relative hover-card">
            
            {/* Top Bar */}
            <div className="flex justify-between items-center border-b border-[#1c602a] pb-4 mb-8">
              <span className="text-sm font-black tracking-widest uppercase">
                GITHUB_STATS
              </span>
              <a
                href="https://github.com/davy-anii"
                target="_blank"
                rel="noreferrer"
                data-cursor-color="#33FF57"
                className="cursor-target border border-[#33FF57] px-2 py-0.5 font-bold text-xs hover-btn hover:bg-[#33FF57] hover:text-black transition-colors"
                title="View GitHub Profile"
              >
                GH
              </a>
            </div>

            {/* Commits Section */}
            <div className="mb-10">
              <h2 className="text-5xl sm:text-6xl font-black italic tracking-tight mb-2">
                COMMITS
              </h2>
              <span className="text-sm font-bold uppercase tracking-wider">
                {loading ? "FETCHING..." : contributions ? `${contributions}+ CONTRIBUTIONS LOGGED` : "465+ CONTRIBUTIONS LOGGED"}
              </span>
            </div>

            {/* Stats Split Rows */}
            <div className="flex flex-col border-y border-[#1c602a] py-4 gap-4 mb-10">
              <div className="flex justify-between items-center text-lg sm:text-xl font-bold uppercase tracking-wider">
                <span>Repositories</span>
                <span>{loading ? "..." : data?.public_repos ? `${data.public_repos}+` : "21+"}</span>
              </div>
              <div className="flex justify-between items-center text-lg sm:text-xl font-bold uppercase tracking-wider">
                <span>Followers</span>
                <span>{loading ? "..." : data?.followers ? String(data.followers).padStart(2, '0') : "09"}</span>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex justify-between items-end">
              <div className="flex flex-col text-[#666666] text-xs font-mono leading-relaxed">
                <span>USR: davy-anii</span>
                <span>STATUS: HIGH_ACTIVITY</span>
              </div>
              {/* Abstract decorative bar on the right */}
              <div className="w-16 h-8 bg-[#333333] relative flex items-center justify-center">
                 <div className="w-full h-0.5 bg-[#888888]" />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
      </div>
      </div>
    </section>
  );
}
