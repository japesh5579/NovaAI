"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content: "Hi! I'm Nova, your AI assistant. Ask me anything about our services, tech stack, or how we can help your project. 👋",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply: Message = { role: "assistant", content: data.text ?? "Sorry, something went wrong." };
      setMessages(prev => [...prev, reply]);
      if (!open) setUnread(u => u + 1);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bubble button */}
      <div className="fixed bottom-6 right-6 z-[200]">
        <AnimatePresence>
          {open && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] sm:w-[380px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl shadow-black/15 flex flex-col overflow-hidden"
              style={{ height: 480 }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#1E3A73] to-[#2a4fa0] shrink-0">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-none">Nova AI</p>
                  <p className="text-white/60 text-[10px] mt-0.5">Nova AICode Studio · Online</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X size={13} className="text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
                {messages.map((m, i) => (
                  <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      m.role === "assistant"
                        ? "bg-gradient-to-br from-[#1E3A73] to-[#2a4fa0]"
                        : "bg-gradient-to-br from-[#1E3A73] to-[#2a4fa0]"
                    }`}>
                      {m.role === "assistant"
                        ? <Bot size={12} className="text-white" />
                        : <User size={12} className="text-white" />}
                    </div>
                    {/* Bubble */}
                    <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed ${
                      m.role === "assistant"
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                        : "bg-gradient-to-br from-[#1E3A73] to-[#2a4fa0] text-white rounded-br-sm"
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1E3A73] to-[#2a4fa0] flex items-center justify-center shrink-0">
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
                      <Loader2 size={14} className="animate-spin text-gray-400" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-800 shrink-0">
                <form
                  onSubmit={e => { e.preventDefault(); send(); }}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask me anything…"
                    className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1E3A73] to-[#2a4fa0] flex items-center justify-center disabled:opacity-40 transition-opacity shrink-0"
                  >
                    <Send size={12} className="text-white" />
                  </button>
                </form>
                <p className="text-center text-[9px] text-gray-300 dark:text-gray-600 mt-1.5">Powered by Groq · Nova AICode Studio</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E3A73] to-[#2a4fa0] shadow-xl shadow-[#1E3A73]/30 flex items-center justify-center relative"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <X size={22} className="text-white" />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <MessageCircle size={22} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          <AnimatePresence>
            {unread > 0 && !open && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
              >
                {unread}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
