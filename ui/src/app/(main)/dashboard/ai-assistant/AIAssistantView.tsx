"use client";
import AIAssistantContent from "./components/AIAssistantContent";
import useAIAssistant from "./hooks/useAIAssistant";

export default function AIAssistantView(): React.ReactNode {
  const aiData = useAIAssistant();

  return <AIAssistantContent aiData={aiData} />;
}
