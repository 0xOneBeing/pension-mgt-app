import { Button, Table, Tag, Typography } from "antd";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const contributions = [
  {
    id: 1,
    date: "Feb 2025",
    amount: "₦50,000",
    type: "Mandatory",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "Jan 2025",
    amount: "₦30,000",
    type: "Voluntary",
    status: "Pending",
  },
  {
    id: 3,
    date: "Dec 2024",
    amount: "₦45,000",
    type: "Mandatory",
    status: "Confirmed",
  },
  {
    id: 4,
    date: "Nov 2024",
    amount: "₦25,000",
    type: "Voluntary",
    status: "Rejected",
  },
];

export default function Contributions() {
  const navigate = useNavigate();

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "Mandatory" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Confirmed"
            ? "green"
            : status === "Pending"
            ? "gold"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center ">
        <Title level={3}>Contribution History</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/contributions/manage")}
        >
          Add Contribution
        </Button>
      </div>
      <Table dataSource={contributions} columns={columns} rowKey="id" />
    </DashboardLayout>
  );
}
