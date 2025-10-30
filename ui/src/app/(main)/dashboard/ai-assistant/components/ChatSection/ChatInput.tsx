/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import {
  IconMicrophone,
  IconSend,
  IconMicrophoneOff,
} from "@tabler/icons-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatInputProps): React.ReactNode {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<unknown>(null);
  const [transcript, setTranscript] = useState("");

  // Check if speech recognition is supported
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setIsSupported(true);
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        // Configure speech recognition
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        // Handle speech recognition results
        recognition.onresult = (event: any) => {
          let finalTranscript = "";
          let interimTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          // Update the input with the transcribed text
          const newText = value + finalTranscript;
          if (finalTranscript) {
            onChange(newText);
          }

          // Show interim results
          setTranscript(interimTranscript);
        };

        // Handle speech recognition errors
        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        // Handle speech recognition end
        recognition.onend = () => {
          setIsListening(false);
          setTranscript("");
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        (recognitionRef.current as any).stop();
      }
    };
  }, [value, onChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMicrophoneClick = () => {
    if (!isSupported) {
      alert(
        "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari."
      );
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        (recognitionRef.current as any).stop();
      }
      setIsListening(false);
      setTranscript("");
    } else {
      // Start listening
      try {
        if (recognitionRef.current) {
          (recognitionRef.current as any).start();
          setIsListening(true);
        }
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
      }
    }
  };

  return (
    <div className="p-4 border-t border-[var(--color-gray-border)] bg-white">
      {/* Voice Recognition Status */}
      {isListening && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-700 font-medium">
              Listening...
            </span>
          </div>
          {transcript && (
            <p className="text-sm text-red-600 mt-1 italic">
              &ldquo;{transcript}&rdquo;
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            value={value + (isListening ? transcript : "")}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isListening
                ? "Listening... Speak now"
                : "Ask about your finances..."
            }
            disabled={disabled}
            rows={1}
            className={`w-full px-4 py-3 pr-12 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
              isListening
                ? "border-red-300 bg-red-50"
                : "border-[var(--color-gray-border)]"
            }`}
            style={{
              minHeight: "48px",
              maxHeight: "120px",
            }}
          />

          <button
            type="button"
            onClick={handleMicrophoneClick}
            disabled={!isSupported}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
              isListening
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : isSupported
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-gray-50 text-gray-400 cursor-not-allowed"
            }`}
            title={
              isSupported
                ? isListening
                  ? "Stop listening"
                  : "Start voice input"
                : "Voice input not supported"
            }
          >
            {isListening ? (
              <IconMicrophoneOff size={16} />
            ) : (
              <IconMicrophone size={16} />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="p-3 bg-[var(--color-blue)] text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Send message"
        >
          <IconSend size={16} />
        </button>
      </form>

      <p className="text-xs text-[var(--color-text-gray)] mt-2">
        {isSupported
          ? "Tip: Click the microphone to use voice commands"
          : "Voice input requires Chrome, Edge, or Safari browser"}
      </p>
    </div>
  );
}

