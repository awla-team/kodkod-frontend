import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";

const Toaster = (type = "success", message = "", options = {}) => {
  const _options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
    ...options,
  };
  switch (type) {
    case "success": {
      return toast.success(message, _options as ToastOptions);
    }
    case "info": {
      return toast.info(message, _options as ToastOptions);
    }

    case "warning": {
      return toast.warn(message, _options as ToastOptions);
    }
    case "error": {
      return toast.error(message, _options as ToastOptions);
    }
    default: {
      return toast.success(message, _options as ToastOptions);
    }
  }
};

export default Toaster;
