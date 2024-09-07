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
              "max-w-lg space-y-4 bg-purple-dark p-12 border-[3px] w-[480px] h-[537px] rounded-[40px] border-black shadow-[0_10px_0_rgba(0,0,0,1)]",
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

// <Dialog open={isOpen} onOpenChange={onOpenChange}>
//   <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
//   <Dialog.Content ref={ref} className={panelClasses}>
//     {children}
//   </Dialog.Content>
// </Dialog>;
