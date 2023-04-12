import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "warning" | "info";

interface IToastType {
  showToast: (message: string, type: ToastType, options?: ToastOptions) => void;
}

const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
};

export const useToast = (): IToastType => {
  const showToast = (
    message: string,
    type: ToastType,
    options?: ToastOptions
  ) => {
    switch (type) {
      case "success":
        toast.success(message, options || defaultOptions);
        break;
      case "error":
        toast.error(message, options || defaultOptions);
        break;
      case "warning":
        toast.warn(message, options || defaultOptions);
        break;
      case "info":
        toast.info(message, options || defaultOptions);
        break;
      default:
        toast(message, options || defaultOptions);
    }
  };

  return { showToast };
};
