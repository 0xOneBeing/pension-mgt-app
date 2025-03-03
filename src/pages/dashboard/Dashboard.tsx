// import { Button } from "antd";
// import { useDispatch } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       <Button type="primary" onClick={handleLogout}>
//         Logout
//       </Button>
//     </div>
//   );
// };

// export default Dashboard;

import { Card, Avatar, List, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";

const { Title, Text } = Typography;

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const recentTransactions = [
    { date: "Feb 20, 2025", amount: "₦50,000", type: "Mandatory" },
    { date: "Jan 15, 2025", amount: "₦30,000", type: "Voluntary" },
    { date: "Dec 10, 2024", amount: "₦45,000", type: "Mandatory" },
    { date: "Nov 05, 2024", amount: "₦25,000", type: "Voluntary" },
    { date: "Oct 25, 2024", amount: "₦40,000", type: "Mandatory" },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1">
          <div className="flex items-center space-x-4">
            <Avatar size={80} icon={<UserOutlined />} />
            <div>
              <Title level={4}>{user?.name || "John Doe"}</Title>
              <Text type="secondary">Frontend Engineer</Text>
            </div>
          </div>
        </Card>

        {/* Contribution Summary */}
        <Card className="col-span-2">
          <Title level={4}>Contribution Summary</Title>
          <List
            dataSource={recentTransactions}
            renderItem={(item) => (
              <List.Item>
                <div className="flex justify-between w-full">
                  <Text>{item.date}</Text>
                  <Text>{item.amount}</Text>
                  <Text type="secondary">{item.type}</Text>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
