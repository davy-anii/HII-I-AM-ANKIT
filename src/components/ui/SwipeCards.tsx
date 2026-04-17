"use client";
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';

function CardRotate({ children, onSendToBack, sensitivity, isMobile = false }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Disable 3D transforms on mobile for performance
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  async function handleDragEnd(_: any, info: any) {
    const threshold = sensitivity * 0.8;
    const isPastThreshold =
      Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold;

    if (isPastThreshold) {
      const throwX = info.offset.x > 0 ? 600 : -600;
      await Promise.all([
        animate(x, throwX, { duration: 0.2, ease: 'easeOut' }),
        animate(y, info.offset.y, { duration: 0.2, ease: 'easeOut' }),
      ]);
      onSendToBack();
    }
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab"
      style={{
        x,
        y,
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        // On mobile: allow vertical pan (page scroll) but capture horizontal for swipe
        touchAction: isMobile ? 'pan-y' : 'none',
        willChange: 'transform',
      }}
      drag={isMobile ? 'x' : true}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={isMobile ? 0.85 : 0.7}
      dragMomentum={false}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────── stable default card data ───────────────────
// Defined OUTSIDE the component so the reference never changes and
// never triggers an unwanted useEffect re-run.
const DEFAULT_CARD_URLS = [
  'https://i.postimg.cc/tTg09Nw5/image.png',
  'https://i.postimg.cc/0QvQnF6z/image.png',
  'https://i.postimg.cc/q7t5fJzT/Whats-App-Image-2026-04-17-at-21-52-18.jpg',
  'https://i.postimg.cc/HWSK9MRk/Whats-App-Image-2026-03-10-at-21-04-33-(1).jpg',
];

interface StackItem {
  id: number;
  content: React.ReactNode;
  randomRotation: number;
}

function buildStack(rawCards: any[], useRandom: boolean): StackItem[] {
  return rawCards.map((content: any, index: number) => ({
    id: index + 1,
    content,
    randomRotation: useRandom ? Math.random() * 8 - 4 : 0,
  }));
}

export default function Stack({
  randomRotation = false,
  sensitivity = 50,
  cards = [],
  animationConfig = { stiffness: 250, damping: 30 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileBreakpoint = 768,
}: {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: any[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileBreakpoint?: number;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [mobileBreakpoint]);

  // Build default card JSX only once (stable reference)
  const defaultCards = useMemo(
    () =>
      DEFAULT_CARD_URLS.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`default-card-${i}`}
          src={src}
          alt={`card-${i + 1}`}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      )),
    [] // no deps — these are constants
  );

  // Resolve which card source to use
  const resolvedCards = cards.length > 0 ? cards : defaultCards;

  // Build the stack — only rebuild when the resolved card list or randomRotation changes
  const [stack, setStack] = useState<StackItem[]>(() =>
    buildStack(resolvedCards, randomRotation)
  );

  // Update stack when the card source changes (not on every render)
  const prevCardsRef = useRef(resolvedCards);
  useEffect(() => {
    if (prevCardsRef.current !== resolvedCards) {
      prevCardsRef.current = resolvedCards;
      setStack(buildStack(resolvedCards, randomRotation));
    }
  }, [resolvedCards, randomRotation]);

  const sendToBack = (id: number) => {
    setStack((prev) => {
      const next = [...prev];
      const idx = next.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const [card] = next.splice(idx, 1);
      next.unshift(card);
      return next;
    });
  };

  // Autoplay — use a ref for the latest stack so the interval never needs to change
  const stackRef = useRef(stack);
  useEffect(() => { stackRef.current = stack; }, [stack]);

  useEffect(() => {
    if (!autoplay || stack.length <= 1 || isPaused) return;
    const id = setInterval(() => {
      const topId = stackRef.current[stackRef.current.length - 1]?.id;
      if (topId !== undefined) sendToBack(topId);
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, autoplayDelay, isPaused]); // ← no `stack` in deps

  return (
    <div
      className="relative w-full h-[380px] sm:h-[400px] flex items-center justify-center rounded-lg overflow-hidden py-4 sm:py-8"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23cccccc'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        backgroundColor: '#f5f5f5',
        // Allow vertical scroll on the outer wrapper; horizontal swipe handled by CardRotate
        touchAction: 'pan-y',
      }}
      onMouseEnter={() => !isMobile && pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => !isMobile && pauseOnHover && setIsPaused(false)}
    >
      {/* Swipe hint for mobile */}
      {isMobile && (
        <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-gray-400 font-semibold uppercase tracking-widest pointer-events-none select-none">
          ← swipe →
        </p>
      )}

      <div
        className="relative w-52 h-64 sm:w-64 sm:h-80"
        style={{ perspective: isMobile ? undefined : 1000 }}
      >
        {stack.map((card, index) => {
          const depth = stack.length - 1 - index;
          // Show 3 cards on mobile, 4 on desktop
          if (isMobile ? depth > 2 : depth > 3) return null;

          const isTop = depth === 0;

          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
              isMobile={isMobile}
              disableDrag={!isTop}
            >
              <motion.div
                layout
                className="rounded-2xl overflow-hidden w-full h-full border-4 border-black bg-white select-none shadow-xl"
                onClick={() => sendToBackOnClick && sendToBack(card.id)}
                animate={{
                  rotateZ: depth * 4 + card.randomRotation,
                  scale: 1 - depth * 0.06,
                  y: depth * 9,
                  zIndex: index,
                  opacity: 1 - depth * 0.2,
                }}
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
                style={{
                  transformOrigin: '50% 100%',
                  willChange: 'transform, opacity',
                }}
              >
                {card.content}
              </motion.div>
            </CardRotate>
          );
        })}
      </div>
    </div>
  );
}
