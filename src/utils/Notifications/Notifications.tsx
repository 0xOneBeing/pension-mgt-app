import { showToast as customToast } from "../../components/ShowToast/ShowToast";

export const showToast = (
  type: "success" | "error" | "info",
  content: string
) => {
  customToast(type, content);
};
