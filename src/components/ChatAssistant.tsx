"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useSession } from "next-auth/react";

export function ChatAssistant() {
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  // Only show the assistant if the user is logged in
  if (status !== "authenticated") {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-24 right-4 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] max-w-sm h-96 bg-surface rounded-2xl shadow-2xl border border-outline-variant flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-primary text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  <span className="font-semibold">Care Bot</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-surface-container/30">
                {messages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant/60">
                    <Bot className="w-12 h-12 mb-2 opacity-50" />
                    <p className="text-center text-sm">
                      Hi! I'm Care Bot. How can I help you with your health
                      today?
                    </p>
                  </div>
                ) : (
                  messages.map((m, index) => (
                    <div
                      key={m.id ?? index}
                      className={`flex ${
                        m.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                          m.role === "user"
                            ? "bg-primary text-white rounded-br-none"
                            : "bg-surface text-on-surface border border-outline-variant rounded-bl-none shadow-sm"
                        }`}
                      >
                        {typeof m.content === "string"
                          ? m.content
                          : JSON.stringify(m.content)}
                      </div>
                    </div>
                  ))
                )}

                {error && (
                  <div className="flex justify-center mt-2">
                    <div className="bg-error/10 text-error border border-error/20 rounded-xl p-3 text-sm text-center max-w-[85%]">
                      {error.message ||
                        "An error occurred while connecting to the AI."}
                    </div>
                  </div>
                )}

                {isLoading && !error && (
                  <div className="flex justify-start">
                    <div className="bg-surface text-on-surface border border-outline-variant rounded-2xl rounded-bl-none shadow-sm p-3 flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSubmit}
                className="p-3 bg-surface border-t border-outline-variant flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a health question..."
                  className="flex-1 bg-surface-container rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-primary text-white p-2 rounded-full disabled:opacity-50 flex items-center justify-center transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 ${
            isOpen ? "bg-secondary text-white" : "bg-primary text-white"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
}