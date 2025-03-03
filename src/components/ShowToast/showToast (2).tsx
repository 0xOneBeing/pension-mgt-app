import toast from "react-hot-toast";
import { Toast } from "./Toast";

export const showToast = (
  status: "success" | "error" | "loading" | "info" | "custom",
  message: string,
  duration?: number
) => {
  const toastId = toast.custom(
    (t) => (
      <Toast message={message} status={status} duration={duration} id={t.id} />
    ),
    {
      duration,
    }
  );
  console.log({ toastId });
};
