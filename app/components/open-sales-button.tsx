"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type OpenSalesButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function OpenSalesButton({ children, onClick, type = "button", ...props }: OpenSalesButtonProps) {
  return (
    <button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          window.dispatchEvent(new Event("visicheck:open-sales"));
        }
      }}
    >
      {children}
    </button>
  );
}
