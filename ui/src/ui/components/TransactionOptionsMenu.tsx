"use client";
import { useEffect, useRef } from "react";
import { ITransactionOption } from "@/interfaces/transactionOption";

interface ITransactionOptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  options: ITransactionOption[];
}

export default function TransactionOptionsMenu({
  isOpen,
  onClose,
  options,
}: ITransactionOptionsMenuProps): React.ReactNode {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-8 z-[60] w-[200px] bg-[var(--color-gray)] border border-[var(--color-gray-border)] rounded-lg shadow-lg"
    >
      <ul className="flex flex-col">
        {options.map((option) => (
          <li
            key={option.id}
            onClick={() => {
              option.onClick();
              onClose();
            }}
            className={`
              flex items-center gap-2 p-2 pl-4 text-sm cursor-pointer transition-colors duration-150
              ${
                option.variant === "danger"
                  ? "text-red-600 hover:bg-red-50"
                  : "text-[var(--color-text-gray)] hover:bg-[var(--color-gray-hover)]"
              }
            `}
          >
            {option.icon && (
              <span className="flex-shrink-0">{option.icon}</span>
            )}
            <span>{option.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
