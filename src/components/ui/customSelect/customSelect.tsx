import React from "react";
import Select, { SingleValue, MultiValue } from "react-select";

export interface OptionType {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: OptionType[];
  selectedOption: OptionType | null;
  handleChange: (selected: OptionType | null) => void;
  placeholder?: string;
  isMulti?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selectedOption,
  handleChange,
  placeholder = "Select an option...",
  isMulti = false,
}) => {
  const handleSelectChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>
  ) => {
    handleChange(newValue as SingleValue<OptionType>);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleSelectChange}
      options={options}
      placeholder={placeholder}
      isMulti={isMulti}
      className="w-full"
    />
  );
};

export default CustomSelect;
