"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";

import GlobalRenderer from "./GlobalRenderer";
import store from "./store";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <GlobalRenderer>{children}</GlobalRenderer>
    </Provider>
  );
};
