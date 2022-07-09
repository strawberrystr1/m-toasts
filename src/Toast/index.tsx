import React, { useLayoutEffect, useRef } from "react";

import ToastContainer from "./components/ToastContainer";
import ToastServiceClass, { RefFunctions } from "./utils/ToastService"
import { IToastConfig } from "./types";

export const ToastService = new ToastServiceClass()

export const ToastProvider = (config: Partial<IToastConfig>) => {
  const toastRef = useRef<RefFunctions>();

  useLayoutEffect(() => {
    ToastService.init(toastRef.current);
  }, [])

  return <ToastContainer ref={toastRef} toastConfig={config} />
}


