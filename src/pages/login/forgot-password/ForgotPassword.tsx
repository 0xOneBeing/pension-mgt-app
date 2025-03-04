import { Form, Input, Button, Card } from "antd";
import { CheckOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isFormOK, setIsFormOK] = useState<boolean>(false);

  const currentYear: string = new Date().getFullYear().toString();

  const sendPasswordResetInstruction = async (): Promise<void> => {
    setIsFormOK(true);
  };

  const onFinish = async (values: { username: string }) => {
    console.log({ values });
    await sendPasswordResetInstruction();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-full items-center justify-center flex flex-col lg:w-1/2 hidden lg:flex bg-[var(--primary-color)] text-white text-center">
        <h3 className="text-4xl">Let us help you recover your password</h3>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-screen bg-gray-100">
        <img
          alt="Login Logo"
          className="w-auto h-[150px] mb-4"
          src="images/nlpc_pension_logo_trans_bg.png"
        />
        <Card title={"Forgot Password"} className="w-96">
          {isFormOK ? (
            <div className="flex flex-col items-center justify-center">
              <CheckOutlined
                style={{ color: "white", fontSize: "40px" }}
                className="p-5 bg-[var(--success-color)] text-white rounded-full"
              />
              <div className="py-8 text-center">
                <h3 className="text-[var(--success-color)] font-bold text-xl text-center">
                  Please check your email for password reset instruction
                </h3>
                <p
                  onClick={() => navigate("/")}
                  className="text-lg text-[var(--primary-color)] hover:underline cursor:pointer"
                >
                  Back to login page
                </p>
              </div>
            </div>
          ) : (
            <Form layout="vertical" onFinish={onFinish}>
              <div>
                <Form.Item name="username" rules={[{ required: true }]}>
                  <Input
                    placeholder="Enter your email or username"
                    prefix={<UserOutlined className="mr-2" />}
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}

          <p className="text-xs">&copy; {currentYear} All rights reserved</p>
        </Card>

        {!isFormOK && (
          <Link
            to="/"
            className="text-sm text-[var(--primary-colro)] mt-2 text-center hover:underline"
          >
            Remember password? Click here
          </Link>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
