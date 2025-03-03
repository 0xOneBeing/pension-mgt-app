import React, { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./Toast.css"; // Import CSS for animations

interface ToastProps {
  message: string;
  type?: "success" | "error" | "loading" | "info" | "custom";
  duration?: number;
  icon?: string | React.ReactNode;
}

const Toast = ({
  message,
  type = "custom",
  duration = 3000,
  icon,
}: ToastProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.animationDuration = `${duration}ms`;
    }
  }, [duration]);

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return { background: "#4BB543", color: "#fff" };
      case "error":
        return { background: "#FF0000", color: "#fff" };
      case "loading":
        return { background: "#3498db", color: "#fff" };
      default:
        return { background: "#333", color: "#fff" };
    }
  };

  return (
    <div
      style={{
        padding: "10px 20px",
        borderRadius: "5px",
        ...getToastStyle(),
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={progressRef}
        className="toast-progress"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "3px",
          background: "rgba(255, 255, 255, 0.5)",
          width: "100%",
          transformOrigin: "left",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {icon && <span>{icon}</span>}
        <span>{message}</span>
      </div>
    </div>
  );
};

export const showToast = (
  message: string,
  type?: "success" | "error" | "loading" | "info" | "custom",
  duration?: number,
  icon?: string | React.ReactNode
) => {
  toast.custom(
    <Toast message={message} type={type} duration={duration} icon={icon} />,
    { duration }
  );
};

export const ToastContainer = () => <Toaster />;
