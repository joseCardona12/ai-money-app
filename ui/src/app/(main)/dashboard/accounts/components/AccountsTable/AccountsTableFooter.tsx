"use client";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface IAccountsTableFooterProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function AccountsTableFooter({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: IAccountsTableFooterProps): React.ReactNode {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between p-4 bg-[var(--color-gray-light)] border-t border-[var(--color-gray-border)]">
      <p className="text-sm text-[var(--color-text-gray)]">
        Showing {startItem} to {endItem} of {totalItems} accounts
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconChevronLeft size={18} />
        </button>
        <span className="text-sm text-[var(--color-text-gray)]">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

