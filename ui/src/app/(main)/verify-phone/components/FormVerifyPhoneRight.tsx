import { IconCheck, IconPhone } from "../../../../../public/icons";

export default function FormVerifyPhoneRight(): React.ReactNode {
  return (
    <div className="flex flex-col gap-6">
      <div className="right-header flex flex-col gap-2 justify-center items-center">
        <div
          className="h-14 w-14 rounded-full flex justify-center items-center"
          style={{ backgroundColor: "var(--color-blue-light-2)" }}
        >
          <IconPhone
            className="w-8 h-8"
            style={{ color: "var(--color-blue)" }}
          />
        </div>
        <h2 className="font-bold text-[1.6rem] w-100 text-center">
          Secure your account
        </h2>
      </div>
      <div className="right-body flex flex-col gap-6">
        <p
          className="text-sm w-90 text-center"
          style={{ color: "var(--color-text-gray)" }}
        >
          Phone verification adds an extra layer of security and enables
          two-factor authentication for your account.
        </p>
        <div
          className="justify-between p-3 rounded-lg border flex flex-col gap-2"
          style={{
            backgroundColor: "var(--color-gray)",
            borderColor: "var(--color-gray-border)",
          }}
        >
          <h5 className="text-sm">Why verify your phone?</h5>
          <ul className="flex flex-col gap-1">
            <li
              className="text-[.8rem] flex items-center gap-2"
              style={{ color: "var(--color-text-gray)" }}
            >
              <IconCheck />
              Enable two-factor authentication for enhanced security
            </li>
            <li
              className="text-[.8rem] flex items-center gap-2"
              style={{ color: "var(--color-text-gray)" }}
            >
              <IconCheck />
              Receive instant alerts for important transactions
            </li>
            <li
              className="text-[.8rem] flex items-center gap-2"
              style={{ color: "var(--color-text-gray)" }}
            >
              <IconCheck />
              Quick account recovery if you forget your password
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
