
import { cn } from "@/lib/utils";
import { ModalProps } from "./modalPropsTypes";
import { useEffect, useState } from "react";

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, header, content, footer, className }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transform transition-transform duration-300 ease-in-out"
          onClick={handleClose}
        >
          <div
            className={cn("bg-white text-greyFragments-#333333 rounded-xl transform transition-transform duration-300 ease-in-out p-5", className)}
            onClick={(e) => e.stopPropagation()}
          >
              { header }
              { content }
              { footer }
          </div>
        </div>
      )}
    </>
  );
};

export default Modal