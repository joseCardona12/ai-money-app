export interface IChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface IQuickPrompt {
  id: string;
  text: string;
  icon: string;
  color: string;
}

export interface IInsightCard {
  id: string;
  type: "alert" | "opportunity" | "progress";
  title: string;
  description: string;
  icon: string;
  color: string;
  actionText?: string;
  actionLink?: string;
}

export interface IAICapability {
  id: string;
  text: string;
  icon: string;
}

export interface IAIAssistantState {
  messages: IChatMessage[];
  isTyping: boolean;
  isActive: boolean;
  quickPrompts: IQuickPrompt[];
  insights: IInsightCard[];
  capabilities: IAICapability[];
  inputValue: string;
}

export interface IAIAssistantActions {
  sendMessage: (message: string) => void;
  handleQuickPrompt: (prompt: string) => void;
  setInputValue: (value: string) => void;
  clearChat: () => void;
}

export interface IUseAIAssistant extends IAIAssistantState, IAIAssistantActions {}

export type AIAssistantTab = "chat" | "insights" | "capabilities";
