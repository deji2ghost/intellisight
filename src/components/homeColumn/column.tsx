import { transactionProps } from "@/utils/types/transactionTypes";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { MouseEvent } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

const columnHelper = createColumnHelper<transactionProps>();

export const TransactionColumns = (
  optionsToggle: string | null,
  setOptionsToggle: React.Dispatch<React.SetStateAction<string | null>>
) => [
  columnHelper.accessor("ID", {
    cell: (info) => (
      <Link
        href={`/transaction/${info.row.original.ID}`}
        className="text-ellipsis overflow-auto whitespace-nowrap cursor-pointer"
      >
        {info.getValue()}
      </Link>
    ),
    header: () => (
      <span className="overflow-auto whitespace-nowrap cursor-pointer">ID</span>
    ),
    id: "ID-column", 
  }),
  columnHelper.accessor("Sender Name", {
    cell: (info) => (
      <Link
        href={`/transaction/${info.row.original.ID}`}
        className="block max-w-[130px] truncate cursor-pointer"
        title={info.getValue()} // Show full text on hover
      >
        {info.getValue()}
      </Link>
    ),
    header: () => (
      <span className="overflow-auto whitespace-nowrap cursor-pointer">
        Sender Name
      </span>
    ),
    id: "Sender-Name-column",
  }),
  columnHelper.accessor("Receiver Name", {
    cell: (info) => (
      <Link
        href={`/transaction/${info.row.original.ID}`}
        className="block max-w-[130px] truncate cursor-pointer"
        title={info.getValue()} // Show full text on hover
      >
        {info.getValue()}
      </Link>
    ),
    header: () => (
      <span className="overflow-auto whitespace-nowrap cursor-pointer">
        Receiver Name
      </span>
    ),
    id: "Receiver-Name-column",
  }),
  columnHelper.accessor("Amount", {
    cell: (info) => (
      <Link
        href={`/transaction/${info.row.original.ID}`}
        className="text-ellipsis overflow-auto whitespace-nowrap cursor-pointer"
      >
        {info.getValue()}
      </Link>
    ),
    header: () => (
      <span className="overflow-auto whitespace-nowrap cursor-pointer">Amount</span>
    ),
    id: "Amount-column", 
  }),
  columnHelper.accessor("Status", {
    cell: (info) => (
      <Link
        href={`/transaction/${info.row.original.ID}`}
        className="text-ellipsis overflow-auto whitespace-nowrap cursor-pointer"
      >
        {info.getValue()}
      </Link>
    ),
    header: () => (
      <span className="overflow-auto whitespace-nowrap cursor-pointer">Status</span>
    ),
    id: "Status-column", 
  }),
  columnHelper.accessor("Timestamp", {
    cell: ({ row }) => {
      const item = row.original;

      const fetchDetails = async (id: string) => {
        console.log(id);
      };

      const toggleOptions = (
        id: string,
        e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
      ) => {
        e.stopPropagation();
        setOptionsToggle((prev) => (prev === id ? null : id));
        console.log(optionsToggle, "The ID:", id);
      };

      return (
        <div className="relative flex items-center justify-center">
          <div>
            <div
              onClick={(e) => toggleOptions(item.ID, e)}
              className="font-bold cursor-pointer"
            >
              <FaEllipsisVertical />
            </div>
            <div
              onClick={() => fetchDetails(item.ID)}
              className={`${
                optionsToggle === item.ID ? "flex flex-col" : "hidden"
              } absolute bg-[#FEFEFE] left-12 rounded-sm border w-[200px] gap-2 z-10`}
            >
              <Link
                href={`/transaction/${item.ID}`}
                className="cursor-pointer inline-block p-3 text-[14px] font-[400] hover:bg-[#FAFAFA]"
              >
                View transaction details
              </Link>
            </div>
          </div>
        </div>
      );
    },
    header: () => <span className="">Options</span>,
    id: "Timestamp-column", 
  }),
];