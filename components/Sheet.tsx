"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

export const Sheet = ({ open, onOpenChange, children, side = "right" }: SheetProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        <Dialog.Content
          className={`fixed top-0 ${side === "right" ? "right-0" : "left-0"} h-full w-full max-w-md bg-[#F9F7F5] shadow-2xl outline-none z-50`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-5 border-b border-[#D4A373]/20">
              <h2 className="font-serif text-2xl text-slate-800">Your Cart</h2>
              <Dialog.Close className="rounded-full p-1 hover:bg-slate-100 transition">
                <X className="w-5 h-5 text-slate-600" />
              </Dialog.Close>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};