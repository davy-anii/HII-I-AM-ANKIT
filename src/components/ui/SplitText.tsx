"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

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
              visible: { ...to, transition: { duration, ease } }
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
