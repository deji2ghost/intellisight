import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
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
    manualPagination: true,
  });

  return (
    <div className="flex flex-col justify-between w-full overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-purpleFragments-#BEADFF text-[14px] font-semibold leading-[16.94px] text-left">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-[7.5px] px-[10px] text-left align-middle whitespace-nowrap"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-[14px] text-[#181818] font-normal leading-[16.94px]">
          {error ? (
            <tr>
              <td colSpan={columns.length} className="text-center text-red-500 py-4">
                An error occurred
              </td>
            </tr>
          ) : isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                Loading....
              </td>
            </tr>
          ) : (
            table.getRowModel()?.rows?.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#E4E4E4]"} hover:bg-gray-100`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-[10px] py-[10px] text-ellipsis overflow-hidden whitespace-nowrap"
                  >
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
