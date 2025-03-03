import { Table, Tag, Card } from "antd";
import { useState } from "react";
import DashboardLayout from "../../../../components/DashboardLayout/DashboardLayout";
import ContributionForm from "../../../../components/ContributionsForm/ContributionsForm";
import { Contribution } from "../../../../features/contribution/contributionSlice";
import dayjs from "dayjs"; // Import dayjs for date handling

interface ContributionFormValues {
  type: "Mandatory" | "Voluntary";
  amount: number;
  date: dayjs.Dayjs;
}

const ContributionManagement = () => {
  const [contributions, setContributions] = useState<Contribution[]>([
    {
      id: 1,
      date: "2025-02",
      amount: 50000,
      type: "Mandatory",
      status: "Confirmed",
    },
    {
      id: 2,
      date: "2025-01",
      amount: 30000,
      type: "Voluntary",
      status: "Pending",
    },
  ]);

  const addContribution = (values: ContributionFormValues) => {
    const newContribution: Contribution = {
      id: contributions.length + 1, // Generate a new ID
      date: values.date.format("YYYY-MM"), // Format the date
      amount: values.amount, // Use the amount directly (without currency symbol)
      type: values.type,
      status: "Pending", // Default status
    };
    setContributions([...contributions, newContribution]);
  };

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `₦${amount.toLocaleString()}`, // Format amount with currency symbol
    },
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
      <Card title="Add Contribution" className="mb-6">
        <ContributionForm onSubmit={addContribution} />
      </Card>

      <Card title="Contribution History">
        <Table dataSource={contributions} columns={columns} rowKey="id" />
      </Card>
    </DashboardLayout>
  );
};

export default ContributionManagement;
