"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/ui/CustomTable/customTable";
import { TransactionColumns } from "@/components/homeColumn/column";
import { useTransactions } from "@/context/transactionContext";
import CustomButton from "@/components/ui/customButton/customButton";
import { transactionProps } from "@/utils/types/transactionTypes";

export default function Home() {
  const {
    transactions,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    itemPerPage,
    optionsToggle,
    setOptionsToggle,
  } = useTransactions();

  const [dropButton, setDropButton] = useState(false);
  const [buttonItem, setButtonItem] = useState<string>("All");

  const [filteredTransactions, setFilteredTransactions] = useState<transactionProps[]>([]);

  useEffect(() => {
    let filtered = transactions;
    console.log(filtered)
    if (buttonItem !== "All") {
      filtered = transactions.filter((item) => item.Status === buttonItem);
    }
    setFilteredTransactions(filtered);
    console.log(filteredTransactions)
  }, [buttonItem, transactions]);

  const handleDropDown = () => {
    setDropButton(!dropButton);
  };

  const handleButtonItem = (item: string) => {
    setButtonItem(item);
    setDropButton(!dropButton);
  };

  return (
    <div
      onClick={() => setOptionsToggle(null)}
      className="bg-greyFragments-#FAFAFA h-screen text-greyFragments-#333333"
    >
      <CustomButton
        onClick={handleDropDown}
        handleDropdownItem={(item) => handleButtonItem(item)}
        dropDown={dropButton}
        menuItems={["All", "Completed", "Pending", "Failed"]}
        className="w-[150px]"
      >
        {buttonItem}
      </CustomButton>
      <div className="w-[60%] mx-auto">
        <Table
          columns={TransactionColumns(optionsToggle, setOptionsToggle)}
          currentPage={currentPage}
          data={filteredTransactions}
          pageSize={itemPerPage}
          error={error}
          isLoading={isLoading}
          onPageChange={(newPage) => setCurrentPage(newPage)}
          totalCount={transactions.length}
        />
      </div>
    </div>
  );
}
