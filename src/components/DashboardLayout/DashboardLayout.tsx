import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Typography,
  Breadcrumb,
  Drawer,
  Button,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  PieChartOutlined,
  LogoutOutlined,
  NotificationOutlined,
  PlusCircleOutlined,
  AccountBookOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import { RootState } from "../../store";
import SettingsModal from "../SettingsModal/SettingsModal";
import { ShowToast } from "../ShowToast/ShowToast";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const tempAvatar = useSelector((state: RootState) => state.auth.tempAvatar);
  const tempName = useSelector((state: RootState) => state.auth.tempName);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ title: string }[]>(
    []
  );
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // State for drawer visibility

  type MenuItem = Required<MenuProps>["items"][number];

  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
  };

  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    padding: "0px 20px",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const handleLogout = () => {
    dispatch(logout());
    ShowToast("success", "Logged out successful");
    navigate("/");
  };

  const handleSettingsClick = () => {
    setIsSettingsModalVisible(true);
  };

  const handleSettingsModalClose = () => {
    setIsSettingsModalVisible(false);
  };

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  // Dropdown menu items
  const dropdownMenu = (
    <Menu>
      <Menu.Item
        key="settings"
        icon={<SettingOutlined />}
        onClick={handleSettingsClick}
      >
        Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Map routes to menu keys
  const routeToKeyMap: { [key: string]: string } = {
    "/dashboard": "1",
    "/contributions": "contributions",
    "/contributions/manage": "manage-contributions",
    "/statements": "statements",
    "/notifications": "notifications",
    "/benefits": "benefits",
  };

  // Map routes to submenu keys
  const routeToSubmenuKeyMap: { [key: string]: string } = {
    "/contributions": "contributions",
    "/contributions/manage": "contributions",
  };

  // Generate breadcrumb items based on the current path
  const generateBreadcrumbItems = (path: string) => {
    const paths = path.split("/").filter((p) => p);
    const items = paths.map((p, index) => {
      const url = `/${paths.slice(0, index + 1).join("/")}`;
      const title = p.charAt(0).toUpperCase() + p.slice(1);
      return { title, url };
    });
    return items;
  };

  // Update selectedKeys, openKeys, and breadcrumbItems based on the current route
  useEffect(() => {
    const path = location.pathname;
    const key = routeToKeyMap[path] || "1";
    setSelectedKeys([key]);

    const submenuKey = routeToSubmenuKeyMap[path];
    if (submenuKey) {
      setOpenKeys([submenuKey]);
    } else {
      setOpenKeys([]);
    }

    const breadcrumbItems = generateBreadcrumbItems(path);
    setBreadcrumbItems(breadcrumbItems);
  }, [location.pathname]);

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
      ],
    },
    {
      key: "statements",
      label: "Statements",
      icon: <AccountBookOutlined />,
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
      type: "group",
      children: [
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
    <Layout style={{ minHeight: "100vh" }} hasSider>
      {/* Sider (hidden on mobile) */}
      <Sider
        collapsible
        style={siderStyle}
        className="hidden lg:block" // Hide on mobile, show on larger screens
      >
        <div className="brand flex items-center justify-center gap-2 text-white text-center py-8 text-lg font-semibold">
          <img
            src="/images/nlpc_pension_logo.jpg"
            alt="Brand Logo"
            width="30"
          />
          {/* <h1 className="text-white">NLPC PFA</h1> */}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          defaultSelectedKeys={["1"]}
        />
      </Sider>

      <Layout>
        <Header style={headerStyle}>
          <div className="flex items-center gap-4">
            {/* Hamburger menu button (visible on mobile) */}
            {window.innerWidth < 768 && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={toggleDrawer}
                className="block lg:hidden" // Show on mobile, hide on larger screens
                style={{ color: "#fff" }}
              />
            )}

            {/* Breadcrumb */}
            <Breadcrumb>
              {breadcrumbItems.map((item, index) => (
                <Breadcrumb.Item
                  className="text-base font-semibold text-white"
                  key={index}
                >
                  {item.title}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>

          {/* User dropdown */}
          <Dropdown overlay={dropdownMenu} trigger={["click"]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Avatar
                src={tempAvatar || user?.avatar}
                icon={<UserOutlined />}
              />
              <Text style={{ color: "#fff" }}>
                {tempName || user?.name || "User"}
              </Text>
            </div>
          </Dropdown>
        </Header>

        <Content style={{ margin: "16px" }}>
          <div className="bg-white p-6 rounded-lg shadow">{children}</div>
        </Content>
      </Layout>

      {/* Drawer for mobile navigation */}
      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              // width: 250,
            },
          },
        }}
      >
        <Drawer
          title={false}
          placement="left"
          onClose={toggleDrawer}
          visible={isDrawerVisible}
          width={250}
          style={{
            backgroundColor: "var(--sider-menu-bg)",
          }}
          bodyStyle={{ padding: 0 }}
        >
          <div className="brand flex items-center justify-center gap-2 text-white text-center py-8 text-lg font-semibold">
            <img
              src="/images/nlpc_pension_logo.jpg"
              alt="Brand Logo"
              width="30"
            />
            <h1 className="text-white text-2xl">NLPC PFA</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            defaultSelectedKeys={["1"]}
          />
        </Drawer>
      </ConfigProvider>

      {/* Settings Modal */}
      <SettingsModal
        visible={isSettingsModalVisible}
        onClose={handleSettingsModalClose}
      />
    </Layout>
  );
}
