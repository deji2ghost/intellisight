"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchTransactions } from "@/actions/getTransactions";
import { transactionProps } from "@/utils/types/transactionTypes";

interface TransactionContextType {
  transactions: transactionProps[];
  setTransactions: React.Dispatch<React.SetStateAction<transactionProps[]>>
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  optionsToggle: string | null;
  setOptionsToggle: React.Dispatch<React.SetStateAction<string | null>>;
  itemPerPage: number;
  dropButton: boolean;
  setDropButton: (value: boolean) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  buttonItem: string;
  setButtonItem: (value: string) => void;
  filteredTransactions: transactionProps[]
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<transactionProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [optionsToggle, setOptionsToggle] = useState<string | null>(null);
  const itemPerPage = 10;
  const [dropButton, setDropButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonItem, setButtonItem] = useState<string>("All");

  const [filteredTransactions, setFilteredTransactions] = useState<
    transactionProps[]
  >([]);

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

  useEffect(() => {
    let filtered = transactions;
    console.log(filtered);
    if (buttonItem !== "All") {
      filtered = transactions.filter((item) => item.Status === buttonItem);
    }
    setFilteredTransactions(filtered);
  }, [buttonItem, transactions]);

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
        itemPerPage,
        dropButton,
        setDropButton,
        isOpen,
        setIsOpen,
        buttonItem,
        setButtonItem,
        filteredTransactions,
        setTransactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};
