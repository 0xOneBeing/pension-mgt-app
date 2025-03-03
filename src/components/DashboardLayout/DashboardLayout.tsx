// import React, { useState } from "react";
// import { Layout, Menu, Dropdown, Avatar, Typography } from "antd";
// import {
//   UserOutlined,
//   PieChartOutlined,
//   LogoutOutlined,
//   NotificationOutlined,
//   PlusCircleOutlined,
//   AccountBookOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import type { MenuProps } from "antd";
// import { RootState } from "../../store";
// import SettingsModal from "../SettingsModal/SettingsModal"; // Import the SettingsModal

// const { Header, Sider, Content } = Layout;
// const { Text } = Typography;

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const tempAvatar = useSelector((state: RootState) => state.auth.tempAvatar);
//   const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

//   type MenuItem = Required<MenuProps>["items"][number];

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const handleSettingsClick = () => {
//     setIsSettingsModalVisible(true);
//   };

//   const handleSettingsModalClose = () => {
//     setIsSettingsModalVisible(false);
//   };

//   // Dropdown menu items
//   const dropdownMenu = (
//     <Menu>
//       <Menu.Item
//         key="settings"
//         icon={<SettingOutlined />}
//         onClick={handleSettingsClick}
//       >
//         Settings
//       </Menu.Item>
//       <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   const items: MenuItem[] = [
//     {
//       key: "1",
//       label: "Dashboard",
//       icon: <UserOutlined />,
//       onClick: () => {
//         navigate("/dashboard");
//       },
//     },
//     {
//       key: "contributions",
//       label: "Contributions",
//       icon: <PieChartOutlined />,
//       children: [
//         {
//           key: "contributions",
//           label: "Contributions",
//           icon: <PieChartOutlined />,
//           onClick: () => {
//             navigate("/contributions");
//           },
//         },
//         {
//           key: "manage-contributions",
//           label: "Manage Contributions",
//           icon: <PieChartOutlined />,
//           onClick: () => {
//             navigate("/contributions/manage");
//           },
//         },
//       ],
//     },
//     {
//       key: "statements",
//       label: "Statements",
//       icon: <AccountBookOutlined />,
//       onClick: () => {
//         navigate("/statements");
//       },
//     },
//     {
//       key: "notifications",
//       label: "Notifications",
//       icon: <NotificationOutlined />,
//       onClick: () => {
//         navigate("/notifications");
//       },
//     },
//     {
//       key: "benefits",
//       label: "Benefits",
//       icon: <PlusCircleOutlined />,
//       onClick: () => {
//         navigate("/benefits");
//       },
//     },
//     {
//       key: "grp",
//       type: "group",
//       children: [
//         {
//           key: "14",
//           label: "Logout",
//           icon: <LogoutOutlined />,
//           onClick: handleLogout,
//         },
//       ],
//     },
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider collapsible>
//         <div className="brand text-white text-center py-8 text-lg font-semibold"></div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           items={items}
//           defaultSelectedKeys={["1"]}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: "0 16px",
//             background: "#001529",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <span className="text-white text-lg font-semibold">Dashboard</span>
//           <Dropdown overlay={dropdownMenu} trigger={["click"]}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 cursor: "pointer",
//               }}
//             >
//               <Avatar
//                 src={tempAvatar || user?.avatar} // Use tempAvatar if available, otherwise use user.avatar
//                 icon={<UserOutlined />}
//               />
//               <Text style={{ color: "#fff" }}>{user?.name || "User"}</Text>
//             </div>
//           </Dropdown>
//         </Header>
//         <Content style={{ margin: "16px" }}>
//           <div className="bg-white p-6 rounded-lg shadow">{children}</div>
//         </Content>
//       </Layout>

//       {/* Settings Modal */}
//       <SettingsModal
//         visible={isSettingsModalVisible}
//         onClose={handleSettingsModalClose}
//       />
//     </Layout>
//   );
// }

import React, { useState } from "react";
import { Layout, Menu, Dropdown, Avatar, Typography } from "antd";
import {
  UserOutlined,
  PieChartOutlined,
  LogoutOutlined,
  NotificationOutlined,
  PlusCircleOutlined,
  AccountBookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { RootState } from "../../store";
import SettingsModal from "../SettingsModal/SettingsModal";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const tempAvatar = useSelector((state: RootState) => state.auth.tempAvatar);
  const tempName = useSelector((state: RootState) => state.auth.tempName);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  type MenuItem = Required<MenuProps>["items"][number];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSettingsClick = () => {
    setIsSettingsModalVisible(true);
  };

  const handleSettingsModalClose = () => {
    setIsSettingsModalVisible(false);
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="brand text-white text-center py-8 text-lg font-semibold"></div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={["1"]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "#001529",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="text-white text-lg font-semibold">Dashboard</span>
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
                src={tempAvatar || user?.avatar} // Use tempAvatar if available, otherwise use user.avatar
                icon={<UserOutlined />}
              />
              <Text style={{ color: "#fff" }}>
                {tempName || user?.name || "User"}
              </Text>{" "}
              {/* Use tempName if available, otherwise use user.name */}
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div className="bg-white p-6 rounded-lg shadow">{children}</div>
        </Content>
      </Layout>

      {/* Settings Modal */}
      <SettingsModal
        visible={isSettingsModalVisible}
        onClose={handleSettingsModalClose}
      />
    </Layout>
  );
}
