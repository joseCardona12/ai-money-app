import Button from "@/ui/components/Button";

interface IUsersTableFooterProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
}

export default function UsersTableFooter({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: IUsersTableFooterProps): React.ReactNode {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  return (
    <div className="px-6 py-4 border-t border-[var(--color-gray-border)] bg-[var(--color-gray-light)]">
      <div className="flex items-center justify-between">
        {/* Items Count */}
        <div className="text-sm text-[var(--color-text-gray)]">
          Showing {startItem}-{endItem} of {totalItems.toLocaleString()} users
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`text-sm ${
              currentPage === 1
                ? "text-[var(--color-text-gray)] cursor-not-allowed"
                : "text-[var(--color-text-black)]"
            }`}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`text-sm ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

