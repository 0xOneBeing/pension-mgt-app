import { ConfigProvider } from "antd";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#335a2d",
        },
      }}
    >
      <AppRoutes />
      <Toaster position="top-right" />
    </ConfigProvider>
  );
}

export default App;
