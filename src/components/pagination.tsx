import { cn } from "@/utils/common";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  onPageChange,
}: PaginationProps) {
  const generatePageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = totalPages > 1 ? generatePageNumbers() : [1];

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center p-4 sm:px-6"
    >
      {currentPage > 1 && (
        <button
          className="bg-card text-secondary-foreground inline-flex cursor-pointer items-center rounded-tl-md rounded-bl-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          onClick={onPreviousPage}
        >
          Prev
        </button>
      )}

      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="bg-card text-secondary-foreground inline-flex items-center border px-4 py-2 text-sm font-medium"
            >
              ...
            </span>
          );
        }

        const page = pageNumber as number;
        return (
          <button
            key={page}
            className={cn(
              "bg-card text-secondary-foreground inline-flex cursor-pointer items-center border px-4 py-2 text-sm font-medium hover:bg-gray-50",
              page === currentPage &&
                "bg-primary text-primary-foreground hover:bg-primary",
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      {currentPage < totalPages && (
        <button
          className="bg-card text-secondary-foreground relative inline-flex cursor-pointer items-center rounded-tr-md rounded-br-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          onClick={onNextPage}
        >
          Next
        </button>
      )}
    </nav>
  );
}
