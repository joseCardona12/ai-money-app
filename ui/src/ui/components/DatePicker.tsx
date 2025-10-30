"use client";
import { useState, useRef, useEffect } from "react";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

interface IDatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
  error,
}: IDatePickerProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || "");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    setSelectedDate(dateString);
    onChange?.(dateString);
    setIsOpen(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return date.toDateString() === selected.toDateString();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={`relative ${className}`} ref={datePickerRef}>
      {/* Input Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-3 py-2 text-left border rounded-lg text-sm
          focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:border-transparent
          transition-colors duration-200 cursor-pointer
          ${error ? "border-red-500" : "border-[var(--color-gray-border)]"}
          ${
            isOpen
              ? "border-[var(--color-blue)] ring-2 ring-[var(--color-blue)]"
              : ""
          }
        `}
        style={{ backgroundColor: "var(--color-white)" }}
      >
        <div className="flex items-center justify-between">
          <span
            style={{
              color: selectedDate
                ? "var(--color-text-black)"
                : "var(--color-text-gray)",
            }}
          >
            {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
          </span>
          <IconCalendar
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Error Message */}
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}

      {/* Calendar Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white border border-[var(--color-gray-border)] rounded-lg shadow-lg p-4 min-w-max"
          style={{ backgroundColor: "var(--color-white)", minWidth: "320px" }}
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth("prev")}
              className="p-1 hover:bg-[var(--color-gray-light)] rounded transition-colors"
            >
              <IconChevronLeft
                size={16}
                className="text-[var(--color-text-gray)]"
              />
            </button>
            <h3 className="text-sm font-medium text-[var(--color-text-black)]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={() => navigateMonth("next")}
              className="p-1 hover:bg-[var(--color-gray-light)] rounded transition-colors"
            >
              <IconChevronRight
                size={16}
                className="text-[var(--color-text-gray)]"
              />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-xs font-medium text-[var(--color-text-gray)] text-center py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((date, index) => (
              <div key={index} className="aspect-square">
                {date && (
                  <button
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    className={`
                      w-full h-full text-xs rounded transition-colors duration-150
                      hover:bg-[var(--color-gray-light)]
                      ${
                        isSelected(date)
                          ? "bg-[var(--color-blue)] text-white hover:bg-[var(--color-blue-hover)]"
                          : isToday(date)
                          ? "bg-[var(--color-blue-light)] text-[var(--color-blue)]"
                          : "text-[var(--color-text-black)]"
                      }
                    `}
                  >
                    {date.getDate()}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
