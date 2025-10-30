import {
  IChatMessage,
  IQuickPrompt,
  IInsightCard,
  IAICapability,
} from "../../types/aiAssistant";

// Initial welcome message from AI Assistant
export const INITIAL_MESSAGE: IChatMessage = {
  id: "welcome-1",
  type: "assistant",
  content:
    "Hello! I'm your AI financial assistant. I can help you analyze spending patterns, optimize your budget, track goals, and provide personalized financial insights. I can also help you create transactions, set up goals, add accounts, and manage budgets. How can I help you today?",
  timestamp: new Date(),
};

// Quick prompts for common actions
export const QUICK_PROMPTS: IQuickPrompt[] = [
  {
    id: "create-default-transaction",
    text: "Create a default transaction",
    icon: "💳",
    color: "blue",
  },
  {
    id: "show-transactions",
    text: "Show my recent transactions",
    icon: "📋",
    color: "green",
  },
  {
    id: "analyze-spending",
    text: "Analyze my spending patterns",
    icon: "📊",
    color: "purple",
  },
  {
    id: "optimize-budget",
    text: "Help me optimize my budget",
    icon: "💡",
    color: "orange",
  },
];

// AI Insights data
export const AI_INSIGHTS: IInsightCard[] = [
  {
    id: "spending-alert",
    type: "alert",
    title: "Spending Alert",
    description:
      "You've spent 25% more on dining out this month compared to last month",
    icon: "⚠️",
    color: "orange",
    actionText: "View details",
  },
  {
    id: "savings-opportunity",
    type: "opportunity",
    title: "Savings Opportunity",
    description: "You could save $150/month by reducing subscription services",
    icon: "💡",
    color: "yellow",
    actionText: "See recommendations",
  },
  {
    id: "goal-progress",
    type: "progress",
    title: "Goal Progress",
    description:
      "You're on track to reach your vacation fund goal 2 months early",
    icon: "🎯",
    color: "green",
    actionText: "View goal",
  },
];

// AI Capabilities
export const AI_CAPABILITIES: IAICapability[] = [
  {
    id: "voice-commands",
    text: "Voice commands",
    icon: "🎤",
  },
  {
    id: "create-transactions",
    text: "Create transactions",
    icon: "💳",
  },
  {
    id: "manage-goals",
    text: "Manage goals & budgets",
    icon: "🎯",
  },
  {
    id: "spending-analysis",
    text: "Spending analysis",
    icon: "📊",
  },
  {
    id: "personalized-advice",
    text: "Personalized advice",
    icon: "💡",
  },
];

// Sample chat messages for demonstration
export const SAMPLE_MESSAGES: IChatMessage[] = [INITIAL_MESSAGE];
