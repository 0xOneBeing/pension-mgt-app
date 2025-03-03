import { message } from "antd";

export const showToast = (
  type: "success" | "error" | "info",
  content: string
) => {
  message[type](content);
};
