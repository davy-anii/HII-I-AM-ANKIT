"use client";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Use transforms ONLY if drag is enabled to save on calculations
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleDragEnd(_: any, info: any) {
    const isPastThreshold = Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity;
    if (isPastThreshold) {
      onSendToBack();
    }
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`absolute inset-0 ${disableDrag ? 'cursor-default' : 'cursor-grab'}`}
      style={{ 
        x, 
        y, 
        rotateX: disableDrag ? 0 : rotateX, 
        rotateY: disableDrag ? 0 : rotateY, 
        touchAction: "none" 
      }}
      drag={!disableDrag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={!disableDrag ? { cursor: 'grabbing' } : undefined}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackItem {
  id: number;
  content: any;
  randomRotation: number;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 60, // Lower sensitivity makes it easier on mobile
  cards = [],
  animationConfig = { stiffness: 300, damping: 25 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768
}: {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: any[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const processCards = (rawCards: any[]) => {
    return rawCards.map((content: any, index: number) => ({ 
      id: index + 1, 
      content, 
      randomRotation: randomRotation ? Math.random() * 10 - 5 : 0 
    }));
  };

  const [stack, setStack] = useState<StackItem[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    if (cards.length) {
      setStack(processCards(cards));
    } else {
      setStack(processCards([
        {
          id: 1,
          content: (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="https://i.postimg.cc/HWSK9MRk/Whats-App-Image-2026-03-10-at-21-04-33-(1).jpg"
              alt="card-1"
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          )
        },
        {
          id: 2,
          content: (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="https://i.postimg.cc/0QvQnF6z/image.png"
              alt="card-2"
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          )
        },
        {
          id: 3,
          content: (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="https://i.postimg.cc/kGBdvvyv/image.png"
              alt="card-3"
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          )
        },
        {
          id: 4,
          content: (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="https://i.postimg.cc/tTg09Nw5/image.png"
              alt="card-4"
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          )
        }
      ]));
    }
  }, [cards, randomRotation]);

  const sendToBack = (id: number) => {
    setStack((prev: StackItem[]) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      if (index === -1) return newStack;
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  return (
    <div
      className="relative w-full h-[400px] flex items-center justify-center rounded-lg overflow-hidden py-8"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23cccccc'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        backgroundColor: "#f5f5f5",
        touchAction: "none"
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="relative w-56 h-72 sm:w-64 sm:h-80" style={{ perspective: 1000 }}>
        {stack.map((card, index) => {
          // Only show top 4 cards for performance
          const depth = stack.length - 1 - index;
          if (depth > 3) return null;

          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
              disableDrag={shouldDisableDrag || depth !== 0}
            >
              <motion.div
                layout
                className="rounded-2xl overflow-hidden w-full h-full border-4 border-black bg-white select-none shadow-xl"
                onClick={() => shouldEnableClick && sendToBack(card.id)}
                animate={{
                  rotateZ: depth * 4 + card.randomRotation,
                  scale: 1 - depth * 0.05,
                  y: depth * 8,
                  zIndex: index,
                  opacity: 1 - depth * 0.15
                }}
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping
                }}
                style={{
                  transformOrigin: '50% 100%'
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
