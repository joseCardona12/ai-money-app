"use client";
import { IUseAIAssistant } from "../hooks/useAIAssistant";
import ChatArea from "./ChatSection/ChatArea";
import QuickPrompts from "./ChatSection/QuickPrompts";
import ChatInput from "./ChatSection/ChatInput";
import AIInsightsPanel from "./InsightsSection/AIInsightsPanel";
import AICapabilities from "./CapabilitiesSection/AICapabilities";

interface AIAssistantContentProps {
  aiData: IUseAIAssistant;
}

export default function AIAssistantContent({
  aiData,
}: AIAssistantContentProps): React.ReactNode {
  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-black)]">
            AI Financial Assistant
          </h1>
          <p className="text-[var(--color-text-gray)] text-sm mt-1">
            Get personalized insights and manage your finances with voice or
            text commands
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-green-600 font-medium">AI Active</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[var(--color-gray-border)] flex flex-col h-[600px]">
            {/* Chat with AI Section */}
            <div className="p-4 border-b border-[var(--color-gray-border)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-blue)] flex items-center justify-center">
                  <span className="text-white text-sm">🤖</span>
                </div>
                <div>
                  <h3 className="font-medium text-[var(--color-text-black)]">
                    Chat with AI
                  </h3>
                  <p className="text-xs text-[var(--color-text-gray)]">
                    Ask me anything about your finances or use voice commands
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <ChatArea messages={aiData.messages} isTyping={aiData.isTyping} />

            {/* Quick Prompts */}
            <QuickPrompts
              prompts={aiData.quickPrompts}
              onPromptClick={aiData.handleQuickPrompt}
            />

            {/* Chat Input */}
            <ChatInput
              value={aiData.inputValue}
              onChange={aiData.setInputValue}
              onSend={aiData.sendMessage}
              disabled={aiData.isTyping}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-white rounded-xl p-4 border border-[var(--color-gray-border)]">
            <AIInsightsPanel insights={aiData.insights} />
          </div>

          {/* AI Capabilities */}
          <div className="bg-white rounded-xl p-4 border border-[var(--color-gray-border)]">
            <AICapabilities capabilities={aiData.capabilities} />
          </div>
        </div>
      </div>
    </div>
  );
}
