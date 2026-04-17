"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // 1.8 seconds

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFFDF5]"
        >
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="text-4xl font-black tracking-tight mb-4">
              Ankit<span className="text-[#FBFF48] bg-black px-1 ml-0.5">.</span>
            </div>
            <div className="text-sm font-bold uppercase tracking-widest px-2 py-1 border-2 border-black bg-white hard-shadow-sm">
              Loading...
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
