import { Form, Input, Button, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import toast from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    if (values.username === "admin" && values.password === "password") {
      dispatch(login({ name: "Admin User", role: "admin" }));
      message.success("Login successful!");
      toast("Login successful.");
      navigate("/dashboard");
    } else if (
      values.username === "individual" &&
      values.password === "password"
    ) {
      dispatch(login({ name: "Individual User", role: "individual" }));
      toast("Login successful.");
      navigate("/dashboard");
    } else {
      message.error("Invalid credentials!");
      toast("Invalid credentials!");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full lg:w-1/2 "></div>
      <div className="w-full lg:w-1/2 flex items-center justify-center h-screen bg-gray-100"></div>
      <Card title="Login" className="w-96">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
