import { useCallback } from "react";

import { ToastService } from ".."
import { ToastVariant } from '../types'

const showToastFactory = (type: ToastVariant) => (text: string) => {
  ToastService.createToast({ message: text, variant: type })
}

export const useToastService = () => {
  const info = useCallback(showToastFactory("info"), []);
  const success = useCallback(showToastFactory("success"), []);
  const error = useCallback(showToastFactory("error"), []);
  const warning = useCallback(showToastFactory("warning"), []);

  return { info, success, error, warning };
};