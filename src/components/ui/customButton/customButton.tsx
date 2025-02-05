// import { ThreeCircles } from "react-loader-spinner";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { BiChevronDown } from "react-icons/bi";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-purpleFragments-#633CFF text-[16px] lg:hover:bg-opacity-80 rounded-md text-white outline-none border-none shadow-md lg:hover:translate-y-[1px] text-[#fff]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        solid:
          "bg-oliveBlue-400 text-customWhite-100 border-none outline-none text-[16px] rounded-[8px] hover:bg-opacity-80",
        transparent:
          "bg-transparent text-destructive-foreground border border-oliveBlue-500 text-oliveBlue-400 text-[16px] rounded-[8px] hover:bg-opacity-80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg py-[11px] px-[27px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  dropDown?: boolean;
  menuItems?: string[];
  handleDropdownItem?: ( value: string) => void
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      loading,
      variant,
      children,
      menuItems,
      dropDown,
      size,
      handleDropdownItem,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`relative rounded-md inline-block`}>
        <button
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {loading && <p>Loading</p>}
          {children}{dropDown !== undefined && <BiChevronDown />}
        </button>
        {/* Dropdown Menu */}
        {dropDown !== undefined && dropDown && handleDropdownItem &&  (
          <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-purpleFragments-#633CFF shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {menuItems?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleDropdownItem(item)}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CustomButton.displayName = "CustomButton";
export default CustomButton;