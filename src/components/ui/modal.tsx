"use client";

import { classNames } from "@/utils/other";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { forwardRef, PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  className?: HTMLDivElement["className"];
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, children, className, onClose, title, description }, ref) => {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-black bg-transparent">
          <DialogPanel
            className={classNames(
              "space-y-4 bg-purple-dark p-12 border-[3px] w-full max-w-[480px] h-[537px] rounded-[40px] border-black shadow-[0_10px_0_rgba(0,0,0,1)]",
              className
            )}
          >
            {title && <DialogTitle className="font-bold">{title}</DialogTitle>}
            {description && <Description>{description}</Description>}
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
