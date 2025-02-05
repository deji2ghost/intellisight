import CustomButton from "../customButton/customButton";
import { getPaginationArray } from "./pagination";
import { PaginationProps } from "./paginationTypes";

export const CustomPagination= ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const paginationArray = getPaginationArray(currentPage, totalPages);

  return (
    <div className="border flex items-center gap-2 justify-end">
      {/* Previous Button */}
      <CustomButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-[32px] rounded-[4px] border border-[#DFE3E8]"
      >
        Prev
      </CustomButton>

      {/* Pagination Numbers */}
      {paginationArray.map((item, index) => (
        <CustomButton
          key={index}
          onClick={() => typeof item === "number" && onPageChange(item)}
          disabled={currentPage === item}
          style={{
            fontWeight: currentPage === item ? "bold" : "normal",
            cursor: item === "..." ? "default" : "pointer",
          }}
          className="h-[32px] w-[32px] rounded-[4px] border border-[#DFE3E8]"
        >
          {item}
        </CustomButton>
      ))}

      {/* Next Button */}
      <CustomButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-[32px] rounded-[4px] border border-[#DFE3E8] text-center"
      >
        Next
      </CustomButton>
    </div>
  );
};
