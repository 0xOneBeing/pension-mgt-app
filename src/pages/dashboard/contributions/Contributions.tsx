import { Table, Tag, Typography } from "antd";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";

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
      <Title level={3}>Contribution History</Title>
      <Table dataSource={contributions} columns={columns} rowKey="id" />
    </DashboardLayout>
  );
}
