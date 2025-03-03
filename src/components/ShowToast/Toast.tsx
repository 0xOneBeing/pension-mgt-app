import { useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./Toast.css";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";

interface ToastProps {
  message: string;
  status: "success" | "error" | "loading" | "info" | "custom";
  duration?: number;
  id?: string;
}

export const Toast = ({ message, status, duration = 3000, id }: ToastProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.animationDuration = `${duration}ms`;
    }
  }, [duration]);

  const statusConfig = {
    success: {
      background: "#4BB543",
      color: "#fff",
      icon: <CheckCircleFilled />,
    },
    error: {
      background: "#FF0000",
      color: "#fff",
      icon: <CloseCircleFilled />,
    },
    loading: {
      background: "#3498db",
      color: "#fff",
      icon: <LoadingOutlined />,
    },
    info: {
      background: "#333",
      color: "#fff",
      icon: <InfoCircleFilled />,
    },
    custom: {
      background: "#555",
      color: "#fff",
      icon: "🎉",
    },
  };

  const { background, color, icon } = statusConfig[status];

  const handleAnimationEnd = () => {
    if (id) {
      toast.dismiss(id);
    }
  };

  return (
    <div
      style={{
        padding: "10px 20px",
        borderRadius: "5px",
        background,
        color,
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
        onAnimationEnd={handleAnimationEnd}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>{icon}</span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export const ToastContainer = () => <Toaster position="top-right" />;
