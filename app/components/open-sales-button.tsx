"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type OpenGetStartedButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function OpenGetStartedButton({
  children,
  onClick,
  type = "button",
  ...props
}: OpenGetStartedButtonProps) {
  return (
    <button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          window.dispatchEvent(new Event("visicheck:open-getstarted"));
        }
      }}
    >
      {children}
    </button>
  );
}
