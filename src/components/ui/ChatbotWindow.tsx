"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
}

export default function ChatbotWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "model", content: "BEEP BOOP! 🤖 Hello! I am Kairo, Ankit's AI assistant. You can ask me anything about his projects, skills, and experience! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => { setIsOpen(true); setHasOpened(true); };
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => window.removeEventListener("open-ai-chat", handleOpenChat);
  }, []);

  // No auto-open effect. Wait for explicit user tap.

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // We only send recent history to keep payload small and fast context
        body: JSON.stringify({ messages: [...messages, userMessage].slice(-6) }),
      });

      const data = await response.json();

      let aiText = data.reply || data.error || "Communication failure.";

      // Intercept LLM Email Commands directly on the client to bypass IP blocks
      const emailMatch = aiText.match(/\[SEND_EMAIL:\s*([^|]+)\|\s*([^\]]+)\]/i);
      if (emailMatch) {
        const extractedEmail = emailMatch[1].trim().replace(/[<>]/g, '');
        const extractedMessage = emailMatch[2].trim();

        // Strip from the UI
        aiText = aiText.replace(/\[SEND_EMAIL:.*?\]/i, "").trim();

        // 1. Dispatch Web3Forms from the allowed localhost/browser IP
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            name: "Chatbot Bot",
            email: extractedEmail,
            message: extractedMessage,
          })
        }).catch(console.error);

        // 2. Synchronize to the existing Firebase contacts node
        import("firebase/firestore").then(({ addDoc, collection, serverTimestamp }) => {
          import("@/lib/firebase").then(({ db }) => {
            addDoc(collection(db, "contacts"), {
              name: "Chatbot User",
              email: extractedEmail,
              message: extractedMessage,
              timestamp: serverTimestamp(),
            }).catch(console.error);
          });
        });
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: aiText,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "model", content: "Error: Unable to reach AI servers." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: hasOpened ? 0 : 2, duration: 0.5, type: "spring" } }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setIsOpen(true); setHasOpened(true); }}
            className="cursor-target fixed bottom-4 right-4 sm:bottom-5 sm:right-7.5 z-[9990] w-24 h-24 sm:w-32 sm:h-32 flex justify-center items-center drop-shadow-2xl"
            aria-label="Open Chat"
          >
            <img
              src="https://i.postimg.cc/x85MCmc6/image.png"
              alt="AI Logo"
              className="w-full h-full object-contain scale-[1.3] sm:scale-[1.5] mix-blend-multiply"
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] max-h-[80vh] bg-white border-4 border-black hard-shadow flex flex-col font-mono"
          >
            {/* Header */}
            <div className="bg-black text-[#FBFF48] p-4 flex justify-between items-center border-b-4 border-black shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#33FF57] rounded-full animate-pulse" />
                <h3 className="font-black text-sm uppercase tracking-widest">KAIRO__</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-target hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4 bg-[#f9f9f9]"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-xs sm:text-sm font-bold border-2 border-black hard-shadow-sm ${msg.role === "user" ? "bg-[#FBFF48] text-black" : "bg-white text-black"
                      }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-black p-3 text-xs sm:text-sm font-bold border-2 border-black hard-shadow-sm flex gap-1">
                    <span className="animate-bounce inline-block">.</span>
                    <span className="animate-bounce inline-block" style={{ animationDelay: "0.2s" }}>.</span>
                    <span className="animate-bounce inline-block" style={{ animationDelay: "0.4s" }}>.</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t-4 border-black flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills..."
                className="cursor-target flex-1 px-3 py-2 border-2 border-black focus:outline-none focus:bg-[#FFFDF5] text-sm font-bold text-black disabled:opacity-50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="cursor-target bg-black text-white px-3 py-2 border-2 border-black hard-shadow-sm hover-btn disabled:opacity-50 flex justify-center items-center"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
