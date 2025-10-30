"use client";
import { IAICapability } from "../../types/aiAssistant";

interface AICapabilitiesProps {
  capabilities: IAICapability[];
}

export default function AICapabilities({
  capabilities,
}: AICapabilitiesProps): React.ReactNode {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-1">
          AI Capabilities
        </h3>
      </div>

      <div className="space-y-2">
        {capabilities.map((capability) => (
          <div
            key={capability.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-gray-2)] transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-sm">{capability.icon}</span>
            </div>
            <span className="text-sm text-[var(--color-text-black)]">
              {capability.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

