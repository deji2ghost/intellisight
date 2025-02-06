import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableProps } from "./tableTypes";
import { CustomPagination } from "../customPagination/custompagination";

const Table = <T,>({
  data,
  columns,
  isLoading,
  error,
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: TableProps<T>) => {
  const startIndex = (currentPage - 1) * pageSize;
  const lastIndex = startIndex + pageSize;
  const currentData = data?.slice(startIndex, lastIndex);
  const totalPages = Math.ceil((totalCount || 0) / pageSize);

  const table = useReactTable({
    data: currentData && currentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // We are handling pagination manually
  });

  return (
    <div className="flex flex-col justify-between h-[550px]">
      <table className="flex flex-col gap-5 w-full">
        <thead className="bg-purpleFragments-#BEADFF text-darkolivegreen-100 text-[14px] font-semibold leading-[16.94px] text-left gap-[20px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="flex items-center justify-between"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-[7.5px] px-[10px] w-full">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-[14px] text-[#181818] font-normal leading-[16.94px] text-left flex flex-col gap-[10px]">
          {error ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-red-500 py-4"
              >
                An error occurred
              </td>
            </tr>
          ) : isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 flex items-center justify-center">
                Loading....
              </td>
            </tr>
          ) : (
            table.getRowModel()?.rows?.map((row, index) => (
              <tr
                key={row.id}
                className={`rounded-[10px] flex items-center justify-between ${
                  index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#E4E4E4]"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-[10px] py-[10px] w-full">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {currentPage && onPageChange && totalPages && (
        <CustomPagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default Table;
