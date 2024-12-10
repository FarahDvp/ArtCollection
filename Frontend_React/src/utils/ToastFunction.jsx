import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaostSuccess = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const TaostLoading = (message) => {
  toast.promise(() => new Promise((resolve) => setTimeout(resolve, 3000)), {
    pending: "Promise is pending",
    success: "Promise resolved 👌",
    error: "Promise rejected 🤯",
  });
};

const Toastfunction = { TaostSuccess, TaostLoading };
export default Toastfunction;
