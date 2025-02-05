"use client";

import { notFound } from "next/navigation"
import { useTransactions } from "@/context/transactionContext";
import { useParams } from "next/navigation";
import React from "react";

const TransactionDetails = () => {
  const { transactions, isLoading, error } = useTransactions();

  const { id } = useParams();
  const transaction = transactions.find((item) => item.ID === id);   

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="border h-screen">
      <div className="border w-[70%] mx-auto flex flex-col gap-3">
        <div className="flex items-center gap-6">
          <h1 className="w-[30%]">UserAmount: {transaction?.ID}</h1>
          <h1 className="w-[30%]">UserAmount: {transaction?.Timestamp}</h1>
        </div>
        <div className="flex items-center gap-6">
          <h1 className="w-[30%]">UserAmount: {transaction?.Amount}</h1>
          <h1 className="w-[30%]">UserAmount: {transaction?.Status}</h1>
        </div>
        <div className="flex items-center gap-6">
          <h1 className="w-[30%]">UserAmount: {transaction?.["Receiver Name"]}</h1>
          <h1 className="w-[30%]">UserAmount: {transaction?.["Sender Name"]}</h1>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
