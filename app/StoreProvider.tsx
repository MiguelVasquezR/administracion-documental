"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";

import GlobalRenderer from "./GlobalRenderer";
import store from "./store";
import { Metadata } from "next";

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Documental Letras Españolas",
  description: "Sistema de administración de documental de letras españolas",
};

export const StoreProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <GlobalRenderer>{children}</GlobalRenderer>
    </Provider>
  );
};
