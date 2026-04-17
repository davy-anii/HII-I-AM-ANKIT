"use client";

import { useEffect, useRef } from "react";

export default function TargetCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isVisible = useRef(false);
  const currentScale = useRef(1);

  useEffect(() => {
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    if (!hasMouse) return;

    // Force hidden default cursor across all elements
    const style = document.createElement("style");
    style.innerHTML = `
      *:not(input):not(textarea):not(.native-cursor) { cursor: none !important; }
      input, textarea { cursor: text !important; }
    `;
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible.current && cursorRef.current) {
        isVisible.current = true;
        cursorRef.current.style.opacity = "1";
      }
    };

    const updateCursor = () => {
      const ease = 0.25;

      // Interpolate position
      cursor.current.x += (mouse.current.x - cursor.current.x) * ease;
      cursor.current.y += (mouse.current.y - cursor.current.y) * ease;

      // Interpolate scale for smooth hover transitions
      const targetScale = isHovering.current ? 2.5 : 1;
      currentScale.current += (targetScale - currentScale.current) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%) scale(${currentScale.current})`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    if (!hasMouse) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Dynamic Theme Coloring Engine
      const colorTarget = target.closest("[data-cursor-color]") as HTMLElement;
      if (colorTarget && cursorRef.current) {
        const customColor = colorTarget.getAttribute("data-cursor-color");
        cursorRef.current.style.backgroundColor = customColor || "black";
        cursorRef.current.style.borderColor = "black";
      } else if (cursorRef.current) {
        cursorRef.current.style.backgroundColor = "black";
        cursorRef.current.style.borderColor = "white";
      }

      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList?.contains("cursor-target") ||
        target.closest(".cursor-target")
      ) {
        isHovering.current = true;
      } else {
        isHovering.current = false;
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[20px] h-[20px] bg-black border-[3px] border-white rounded-full pointer-events-none opacity-0 flex justify-center items-center"
      style={{
        zIndex: 999999,
        willChange: "transform",
        transition: "opacity 0.3s ease, background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </div>
  );
}
