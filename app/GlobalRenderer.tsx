"use client";

import React, { ReactNode } from "react";
import Index from "@/views";

interface Props {
  readonly children: ReactNode;
}

export const globalRenderer = ({ children }: Props) => {
  return <Index>{children}</Index>;
};

export default globalRenderer;
