import { Form, Input, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../assets/swiper.css"; // Substituted for self-hosted css file ???
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import "./Login.css";
import { ShowToast } from "../../components/ShowToast/ShowToast.tsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentYear: string = new Date().getFullYear().toString();

  const onFinish = (values: { username: string; password: string }) => {
    if (values.username === "admin" && values.password === "password") {
      dispatch(
        login({ name: "Admin User", role: "admin", email: "admin@nlpc.com" })
      );
      ShowToast("success", "Login successful.");
      navigate("/dashboard");
    } else if (values.username === "member" && values.password === "password") {
      dispatch(
        login({ name: "Member User", role: "member", email: "member@nlpc,com" })
      );
      ShowToast("success", "Login successful");
      navigate("/dashboard");
    } else {
      ShowToast("error", "Invalid credentials!");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full lg:w-1/2 hidden lg:flex">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          effect={"fade"}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          pagination={false}
          navigation={false}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          className="h-screen w-full"
        >
          <SwiperSlide>
            <img
              alt="Slide 1"
              src="/images/slide1.jpg"
              className="w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="Slide 2"
              src="/images/slide2.jpg"
              className="w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="Slide 3"
              src="/images/slide3.jpg"
              className="w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="Slide 4"
              src="/images/slide4.jpg"
              className="w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="Slide 5"
              src="/images/slide5.jpg"
              className="w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-screen bg-gray-100">
        <img
          alt="Login Logo"
          className="w-auto h-[150px] mb-4"
          src="images/nlpc_pension_logo_trans_bg.png"
        />
        <Card title={false} className="w-96">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Enter email/username"
                prefix={<UserOutlined className="mr-2" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                placeholder="Enter password"
                prefix={<LockOutlined className="mr-2" />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>

          <p className="text-xs">&copy; {currentYear} All rights reserved</p>
        </Card>
        <Link
          to="/forgot-password"
          className="text-sm text-[var(--primary-colro)] mt-2 text-center hover:underline"
        >
          Forgot password? Click here
        </Link>
      </div>
    </div>
  );
};

export default Login;
