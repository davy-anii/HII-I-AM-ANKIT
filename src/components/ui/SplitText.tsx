"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

function resolveEase(ease: any) {
  if (Array.isArray(ease)) return ease;
  if (typeof ease !== "string") return ease;

  const normalized = ease.toLowerCase();

  const gsapEases: Record<string, number[]> = {
    "power1.out": [0.25, 0.1, 0.25, 1],
    "power2.out": [0.215, 0.61, 0.355, 1],
    "power3.out": [0.215, 0.61, 0.355, 1],
    "power4.out": [0.165, 0.84, 0.44, 1],
    "power1.in": [0.42, 0, 1, 1],
    "power2.in": [0.55, 0.085, 0.68, 0.53],
    "power3.in": [0.55, 0.055, 0.675, 0.19],
    "power4.in": [0.895, 0.03, 0.685, 0.22],
    "power1.inout": [0.455, 0.03, 0.515, 0.955],
    "power2.inout": [0.645, 0.045, 0.355, 1],
    "power3.inout": [0.77, 0, 0.175, 1],
    "power4.inout": [0.86, 0, 0.07, 1],
  };

  return gsapEases[normalized] || ease;
}

const SplitText = ({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = [0.16, 1, 0.3, 1],
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "left",
  tag: Tag = "p",
  onLetterAnimationComplete
}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const elements = splitType === "chars" ? text.split("") : text.split(" ");
  
  return (
    <Tag
      ref={ref}
      className={`inline-block whitespace-normal ${className}`}
      style={{ textAlign, wordWrap: "break-word" }}
    >
      <motion.span
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            transition: { staggerChildren: delay / 1000 }
          }
        }}
        onAnimationComplete={() => onLetterAnimationComplete?.()}
        className="inline-block"
      >
        {elements.map((el: string, i: number) => (
          <motion.span
            key={i}
            variants={{
              hidden: from,
              visible: { ...to, transition: { duration, ease: resolveEase(ease) } }
            }}
            className={`inline-block ${splitType === 'chars' && el === " " ? 'w-[0.3em]' : ''}`}
            style={{ willChange: "transform, opacity" }}
          >
            {el === " " && splitType === 'chars' ? "\u00A0" : el}
            {splitType === "words" && i < elements.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default SplitText;
