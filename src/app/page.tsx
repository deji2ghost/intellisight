"use client";

import React, { useCallback, useState } from "react";
import Table from "@/components/ui/CustomTable/customTable";
import { TransactionColumns } from "@/components/homeColumn/column";
import { useTransactions } from "@/context/transactionContext";
import CustomButton from "@/components/ui/customButton/customButton";
import { SlClose } from "react-icons/sl";
import Label from "@/components/ui/Input/label";
import { Input } from "@/components/ui/Input/input";
import CustomSelect, {
  OptionType,
} from "@/components/ui/customSelect/customSelect";
import { FormErrors } from "@/utils/types/transactionTypes";
import dynamic from "next/dynamic";
import { options } from "../../public/data/optiondata";

const Modal = dynamic(() => import("@/components/ui/customModal/modal"), { ssr: false });

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
    dropButton,
    setDropButton,
    isOpen,
    setIsOpen,
    buttonItem,
    setButtonItem,
    filteredTransactions,
    setTransactions,
  } = useTransactions();

  const [errors, setErrors] = useState({
    "Sender Name": "",
    "Receiver Name": "",
    "Amount": "",
    Status: "",
  });

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [invoiceForm, setInvoiceForm] = useState({
    "ID": "",
    "Sender Name": "",
    "Receiver Name": "",
    "Amount": "",
    "Status": "",
    "Timestamp": "",
  });

  const handleNewInvoice = () => {
  const newErrors: FormErrors = {
    "Sender Name": "",
    "Receiver Name": "",
    "Amount": "",
    "Status": ""
  };

  if (!invoiceForm["Sender Name"].trim()) {
    newErrors["Sender Name"] = "Sender Name is required.";
  }

  if (!invoiceForm["Receiver Name"].trim()) {
    newErrors["Receiver Name"] = "Receiver Name is required.";
  }

  if (!invoiceForm["Amount"].trim() || isNaN(Number(invoiceForm["Amount"].replace(/[^0-9.]/g, "")))) {
    newErrors["Amount"] = "Amount must be a valid number.";
  }

  if (!selectedOption) {
    newErrors["Status"] = "Status is required.";
  }

  if (Object.values(newErrors).some((error) => error !== "")) {
    setErrors(newErrors);
    console.log("Form errors:", newErrors); // Debugging
    return;
  }
    
  setTransactions((prevTransactions) => [invoiceForm, ...prevTransactions]);
    console.log(transactions);
    setInvoiceForm({
      "ID": "",
      "Sender Name": "",
      "Receiver Name": "",
      "Amount": "",
      "Status": "",
      "Timestamp": "",
    });
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newID = `TXN${String(transactions.length + 1).padStart(3, "0")}`;
    const { value, name } = e.target;
    let trimmedValue = value.trimStart();

  
  let errorMessage = "";
  if (trimmedValue === "") {
    errorMessage = `${name} is required.`;
  } else if (name === "Amount" && isNaN(Number(trimmedValue.replace(/[^0-9.]/g, "")))) {
    errorMessage = "Amount must be a valid number.";
  }

  
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: errorMessage,
  }));

    if (name === "Amount") {
      
      const numericValue = trimmedValue.replace(/[^0-9.]/g, "");
  
      trimmedValue = `$${numericValue}`;
    }
  
    const newInput = {
      ...invoiceForm,
      [name]: trimmedValue,
      Status: selectedOption?.value || "Pending",
      ID: newID,
      Timestamp: new Date().toISOString(),
    };
    setInvoiceForm(newInput);
  };

  const handleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, []);

  const handleClose = () => {
    setInvoiceForm({
      "ID": "",
      "Sender Name": "",
      "Receiver Name": "",
      "Amount": "",
      "Status": "",
      "Timestamp": "",
    });
    setIsOpen(!isOpen)
  }

  const handleDropDown = () => {
    setDropButton(!dropButton);
  };

  const handleButtonItem = (item: string) => {
    setButtonItem(item);
    setDropButton(!dropButton);
  };

  const handleSelectChange = (selected: OptionType | null) => {
    if (!selected) {
      console.log("Invalid input: Please select a transaction status.");
      return;
    }
    setSelectedOption(selected);
    setInvoiceForm((prev) => ({
      ...prev,
      Status: selected?.value || "Pending",
    }));
  };

  return (
    <div onClick={() => setOptionsToggle(null)} className=" w-full py-5">
      <div className="flex items-center justify-between px-5 md:px-10">
        <CustomButton
          onClick={handleDropDown}
          handleDropdownItem={(item) => handleButtonItem(item)}
          dropDown={dropButton}
          menuItems={["All", "Completed", "Pending", "Failed"]}
          className="w-[150px]"
        >
          {buttonItem}
        </CustomButton>
        <CustomButton onClick={handleModal}>
          New Invoice
        </CustomButton>
      </div>
      <div className="w-full md:w-[70%] mx-auto">
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
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        header={
          <div className="flex items-center justify-between">
            <h1>Create new invoice here</h1>
            <SlClose onClick={handleClose} />
          </div>
        }
        content={
          <div>
            <div>
              <Label content="Sender Name" />
              <Input
                type="text"
                name="Sender Name"
                value={invoiceForm["Sender Name"]}
                onChange={handleChange}
              />
              {errors["Sender Name"] && <p className="text-red-500 text-sm">{errors["Sender Name"]}</p>}
            </div>
            <div>
              <Label content="Receiver Name" />
              <Input
                type="text"
                name="Receiver Name"
                value={invoiceForm["Receiver Name"]}
                onChange={handleChange}
              />
              {errors["Receiver Name"] && <p className="text-red-500 text-sm">{errors["Receiver Name"]}</p>}
            </div>
            <div>
              <Label content="Amount" />
              <Input
                type="text"
                name="Amount"
                value={invoiceForm["Amount"]}
                onChange={handleChange}
              />
              {errors["Amount"] && <p className="text-red-500 text-sm">{errors["Amount"]}</p>}
            </div>
            <div>
              <Label content="Sender Name" />
              <CustomSelect
                options={options}
                selectedOption={selectedOption}
                handleChange={handleSelectChange}
                placeholder="Pick a status"
              />
              {errors["Status"] && <p className="text-red-500 text-sm">{errors["Status"]}</p>}
            </div>
          </div>
        }
        footer={
          <CustomButton onClick={handleNewInvoice}>Create Invoice</CustomButton>
        }
        className="w-[60%]"
      />
    </div>
  );
}
