export const getPaginationArray = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
) => {
  const pagination: (number | string)[] = [];
  const start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
  const end = Math.min(
    totalPages - 1,
    currentPage + Math.floor(maxVisiblePages / 2)
  );

  // Always include the first page
  pagination.push(1);

  // Ellipsis before the start range
  if (start > 2) {
    pagination.push("...");
  }

  // Add page numbers in the middle range
  for (let i = start; i <= end; i++) {
    pagination.push(i);
  }

  // Ellipsis after the end range
  if (end < totalPages - 1) {
    pagination.push("...");
  }

  // Always include the last page
  if (totalPages > 1) {
    pagination.push(totalPages);
  }

  return pagination;
};
