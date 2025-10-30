"use client";
import { useEffect, useRef } from "react";
import { IChatMessage } from "../../types/aiAssistant";

interface ChatAreaProps {
  messages: IChatMessage[];
  isTyping: boolean;
}

export default function ChatArea({
  messages,
  isTyping,
}: ChatAreaProps): React.ReactNode {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.type === "user"
                ? "bg-[var(--color-blue)] text-white"
                : "bg-[var(--color-gray-2)] text-[var(--color-text-black)]"
            }`}
          >
            {message.type === "assistant" && (
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[var(--color-blue)] flex items-center justify-center">
                  <span className="text-white text-xs">🤖</span>
                </div>
                <span className="text-xs text-[var(--color-text-gray)]">
                  AI Assistant
                </span>
              </div>
            )}
            
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
            
            <div className="mt-2 text-xs opacity-70">
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-3 bg-[var(--color-gray-2)]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[var(--color-blue)] flex items-center justify-center">
                <span className="text-white text-xs">🤖</span>
              </div>
              <span className="text-xs text-[var(--color-text-gray)]">
                AI Assistant
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[var(--color-text-gray)] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[var(--color-text-gray)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-[var(--color-text-gray)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

