import { transactionProps } from "@/utils/types/transactionTypes";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { MouseEvent } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

const columnHelper = createColumnHelper<transactionProps>();

export const TransactionColumns = (optionsToggle: string | null, setOptionsToggle: React.Dispatch<React.SetStateAction<string | null>>) => [
    columnHelper.accessor("ID", {
       cell: (info) => info.getValue(),
       header: () => <span>ID</span>,
    }),
    columnHelper.accessor("Sender Name", {
       cell: (info) => info.getValue(),
       header: () => <span>Sender Name</span>,
    }),
    columnHelper.accessor("Receiver Name", {
       cell: (info) => info.getValue(),
       header: () => <span>Receiver Name</span>,
    }),
    columnHelper.accessor("Amount", {
       cell: (info) => info.getValue(),
       header: () => <span>Amount</span>,
    }),
    columnHelper.accessor("Status", {
       cell: (info) => info.getValue(),
       header: () => <span>Status</span>,
    }),
    columnHelper.accessor("Timestamp", {
      cell: ({ row }) => {
         const item = row.original;
   
         const fetchDetails = async(id: string) => {
           console.log(id)
         }
         
         const toggleOptions = (id: string, e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
            e.stopPropagation()
           setOptionsToggle((prev) => (prev === id ? null : id));
           console.log(optionsToggle, "The ID:", id);
         };
   
         return (
           <div className="relative flex items-center justify-center">
             {/* <h1 className={`${item.status === "Cancelled" ? "bg-[#FBE9E9] text-[#D42620]" : item.status === "Completed" ? "bg-[#E7F5EC] text-[#0F973D]" : item.status === "In progress" ? "bg-[#FEF6E8] text-[#F3A218]" : null} text-[14px] font-normal rounded-[24px] w-[82px] h-[24px] px-1 py-[2px]`}>{item.status}</h1> */}
             <div className="">
               <div onClick={(e) => toggleOptions(item.ID, e)} className="font-bold">
                 <FaEllipsisVertical />
               </div>
               <div
                 onClick={() => fetchDetails(item.ID)}
                 className={` ${
                   optionsToggle === item.ID ? "flex flex-col" : "hidden"
                 } absolute bg-[#FEFEFE] left-12 rounded-sm border w-[200px] p-2 gap-2 z-10`}
               >
                  <Link href={`/transaction/${item.ID}`} className="cursor-pointer inline-block py-1 px-[2px] text-[14px] font-[400] hover:bg-[#FAFAFA]">
                 View transaction details
               </Link>
               <p className="cursor-pointer py-1 px-[2px] text-[14px] font-[400] hover:bg-[#FAFAFA]">
                 Delete transaction
               </p>
               </div>
             </div>
           </div>
         );
       },
       header: () => <span className="">Options</span>,
    }),
 ];