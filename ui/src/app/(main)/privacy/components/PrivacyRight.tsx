import { IconCheck } from "../../../../../public/icons";

export default function PrivacyRight(): React.ReactNode {
  return (
    <div className="flex flex-col gap-4">
      <div className="right-header flex flex-col gap-2 justify-center items-center">
        <div
          className="h-12 w-12 rounded-full flex justify-center items-center"
          style={{ backgroundColor: "var(--color-blue-light-2)" }}
        >
          <span className="text-xl">🔒</span>
        </div>
        <h2 className="font-bold text-[1.4rem] text-center">Data Protection</h2>
      </div>

      <div className="right-body flex flex-col gap-4">
        <p
          className="text-sm text-center"
          style={{ color: "var(--color-text-gray)" }}
        >
          Your privacy is our priority. We follow strict data protection
          standards.
        </p>

        <div
          className="p-3 rounded-lg border flex flex-col gap-2"
          style={{
            backgroundColor: "var(--color-gray)",
            borderColor: "var(--color-gray-border)",
          }}
        >
          <h5 className="text-sm font-medium">Privacy guarantees:</h5>
          <ul className="flex flex-col gap-1">
            <li
              className="text-xs flex items-center gap-2"
              style={{ color: "var(--color-text-gray)" }}
            >
              <IconCheck className="w-3 h-3" />
              Zero data selling
            </li>
            <li
              className="text-xs flex items-center gap-2"
              style={{ color: "var(--color-text-gray)" }}
            >
              <IconCheck className="w-3 h-3" />
              Right to deletion
            </li>
            <li
              className="text-xs flex items-center gap-2"
              style={{ color: "var(--color-text-gray)" }}
            >
              <IconCheck className="w-3 h-3" />
              Data portability
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
