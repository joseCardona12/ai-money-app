"use client";
import { useState, useRef, useEffect } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { SelectOption } from "@/interfaces/selectOption";

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "default" | "currency";
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className = "",
  variant = "default",
}: SelectProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  // Sync selectedValue with value prop when it changes
  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const getVariantStyles = () => {
    if (variant === "currency") {
      return {
        trigger: "px-3 py-2 text-sm font-medium min-w-[80px]",
        dropdown: "mt-1 min-w-[120px]",
      };
    }
    return {
      trigger: "px-3 py-2 text-sm",
      dropdown: "mt-1",
    };
  };

  const styles = getVariantStyles();

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${styles.trigger}
          w-full flex items-center justify-between
          border border-[var(--color-gray-border)] rounded-lg
          hover:border-gray-300 focus:outline-none focus:ring-0
          transition-colors duration-200 cursor-pointer
          ${isOpen ? "border-blue-500 ring-2 ring-blue-500" : ""}
        `}
        style={{ backgroundColor: "var(--color-white)" }}
      >
        <span style={{ color: "var(--color-text-black)" }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IconChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`
            ${styles.dropdown}
            absolute top-full left-0 z-50 w-full
            border border-[var(--color-gray-border)] rounded-lg shadow-lg
            max-h-60 overflow-auto
          `}
          style={{ backgroundColor: "var(--color-white)" }}
        >
          {options && options.length > 0 ? (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-3 py-2 text-left text-sm
                  hover:bg-gray-50 focus:outline-none focus:bg-gray-50
                  transition-colors duration-150
                  ${
                    selectedValue === option.value
                      ? "bg-[var(--color-blue)] text-white focus:bg-[var(--color-blue-hover)]"
                      : ""
                  }
                  ${option === options[0] ? "rounded-t-lg" : ""}
                  ${
                    option === options[options.length - 1] ? "rounded-b-lg" : ""
                  }
                `}
                style={{
                  color:
                    selectedValue === option.value
                      ? "white"
                      : "var(--color-text-black)",
                }}
              >
                {option.label}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
