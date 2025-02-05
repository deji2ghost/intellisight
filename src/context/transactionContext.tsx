"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchTransactions } from "@/actions/getTransactions";
import { transactionProps } from "@/utils/types/transactionTypes";

interface TransactionContextType {
  transactions: transactionProps[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  optionsToggle: string | null;
  setOptionsToggle: React.Dispatch<React.SetStateAction<string | null>>;
  itemPerPage: number
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<transactionProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [optionsToggle, setOptionsToggle] = useState<string | null>(null);
  const itemPerPage = 10

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetchTransactions();
        setTransactions(response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isLoading,
        error,
        currentPage,
        setCurrentPage,
        optionsToggle,
        setOptionsToggle,
        itemPerPage
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};
