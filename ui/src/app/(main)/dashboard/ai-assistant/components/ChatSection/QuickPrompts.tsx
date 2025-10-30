"use client";
import { IQuickPrompt } from "../../types/aiAssistant";

interface QuickPromptsProps {
  prompts: IQuickPrompt[];
  onPromptClick: (prompt: string) => void;
}

export default function QuickPrompts({
  prompts,
  onPromptClick,
}: QuickPromptsProps): React.ReactNode {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100";
      case "purple":
        return "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100";
      case "green":
        return "border-green-200 bg-green-50 text-green-700 hover:bg-green-100";
      case "orange":
        return "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100";
      default:
        return "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <div className="p-4 border-t border-[var(--color-gray-border)]">
      <p className="text-sm text-[var(--color-text-gray)] mb-3">
        Quick prompts:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => onPromptClick(prompt.text)}
            className={`flex items-center gap-2 p-3 rounded-lg border text-sm transition-colors ${getColorClasses(
              prompt.color
            )}`}
          >
            <span className="text-base">{prompt.icon}</span>
            <span className="text-left">{prompt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

