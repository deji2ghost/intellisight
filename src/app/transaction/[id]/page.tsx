"use client";

import { useTransactions } from "@/context/transactionContext";
import { useParams } from "next/navigation";
import React from "react";

const TransactionDetails = () => {
  const { transactions, isLoading, error } = useTransactions();

  const { id } = useParams();
  const transaction = transactions.find((item) => item.ID === id);   

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return "No time";
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen">
      <div className="border w-[70%] mx-auto flex flex-col gap-3">
        <div className="flex flex-col gap-6">
          <h1 className="">User ID: {transaction?.ID}</h1>
          <h1 className="">Time: {formatTimestamp(transaction?.Timestamp)}</h1>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="">User Amount: {transaction?.Amount}</h1>
          <h1 className="">User Status: {transaction?.Status}</h1>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="">UserName: {transaction?.["Receiver Name"]}</h1>
          <h1 className="">ReceiverName: {transaction?.["Sender Name"]}</h1>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
