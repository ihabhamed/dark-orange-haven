
import { useToast as originalUseToast, toast as originalToast } from "@/hooks/use-toast";

// Create wrapper functions that accept arguments but don't pass them in frontend-only mode
export const useToast = () => {
  return {
    toast: (args?: any) => originalToast()
  };
};

export const toast = (args?: any) => originalToast();
