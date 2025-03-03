import { Layout, Menu } from "antd";
import {
  UserOutlined,
  PieChartOutlined,
  LogoutOutlined,
  NotificationOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import type { MenuProps } from "antd";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>["items"][number];

  // const siderStyle = {
  //   overflow: "auto",
  //   height: "100vh",
  //   position: "fixed",
  //   width: "200px",
  //   left: 0,
  //   top: 0,
  //   bottom: 0,
  // };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const items: MenuItem[] = [
    {
      key: "1",
      label: "Dashboard",
      icon: <UserOutlined />,
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      key: "contributions",
      label: "Contributions",
      icon: <PieChartOutlined />,
      children: [
        {
          key: "contributions",
          label: "Contributions",
          icon: <PieChartOutlined />,
          onClick: () => {
            navigate("/contributions");
          },
        },
        {
          key: "manage-contributions",
          label: "Manage Contributions",
          icon: <PieChartOutlined />,
          onClick: () => {
            navigate("/contributions/manage");
          },
        },
        // {
        //   key: "sub3",
        //   label: "Submenu",
        //   children: [
        //     { key: "7", label: "Option 7" },
        //     { key: "8", label: "Option 8" },
        //   ],
        // },
      ],
    },
    // {
    //   type: "divider",
    // },
    // {
    //   key: "sub4",
    //   label: "Navigation Three",
    //   icon: <SettingOutlined />,
    //   children: [
    //     { key: "9", label: "Option 9" },
    //     { key: "10", label: "Option 10" },
    //     { key: "11", label: "Option 11" },
    //     { key: "12", label: "Option 12" },
    //   ],
    // },
    {
      key: "statements",
      label: "Statements",
      icon: <UserOutlined />,
      onClick: () => {
        navigate("/statements");
      },
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: <NotificationOutlined />,
      onClick: () => {
        navigate("/notifications");
      },
    },
    {
      key: "benefits",
      label: "Benefits",
      icon: <PlusCircleOutlined />,
      onClick: () => {
        navigate("/benefits");
      },
    },
    {
      key: "grp",
      // label: "Group",
      type: "group",
      children: [
        // { key: "13", label: "Option 13" },
        {
          key: "14",
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        // style={siderStyle}
        collapsible
      >
        <div className="brand text-white text-center py-8 text-lg font-semibold"></div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={["1"]}
          // onClick={onClick}
          // style={{ width: 256 }}
          // defaultOpenKeys={["sub1"]}
        />
      </Sider>
      <Layout>
        <Header
        // className="fixed w-full mb-8 z-10"
        >
          <span className="text-white shadow-md px-6 text-lg font-semibold">
            Dashboard
          </span>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div className="bg-white p-6 rounded-lg shadow">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
