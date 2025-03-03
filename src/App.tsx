import { ConfigProvider } from "antd";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "./components/ShowToast/Toast";

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
      <ToastContainer />
    </ConfigProvider>
  );
}

export default App;
