"use client";

import { AppProgressProvider as ProgressBar } from "@bprogress/next";
import { ReactNode } from "react";

const ProgressBarProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressBar
      height="4px"
      color="#ffffff"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressBar>
  );
};

export default ProgressBarProvider;
