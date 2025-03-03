import { Table, Tag, Card } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../../../features/notifications/notificationsSlice";
import { showToast } from "../../../../utils/Notifications/Notifications";
import DashboardLayout from "../../../../components/DashboardLayout/DashboardLayout";
import ContributionForm from "../../../../components/ContributionsForm/ContributionsForm";
import { validateContribution } from "../../../../utils/Validators/Validators";

const ContributionManagement = () => {
  const dispatch = useDispatch();

  const [contributions, setContributions] = useState<any[]>([
    {
      id: 1,
      date: "2025-02",
      amount: "₦50,000",
      type: "Mandatory",
      status: "Confirmed",
    },
    {
      id: 2,
      date: "2025-01",
      amount: "₦30,000",
      type: "Voluntary",
      status: "Pending",
    },
  ]);

  const addContribution = (values: any) => {
    const newContribution = {
      id: contributions.length + 1,
      date: values.date.format("YYYY-MM"),
      amount: `₦${values.amount}`,
      type: values.type,
      status: "Pending",
    };
    setContributions([...contributions, newContribution]);
  };

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

  const handleContributionSubmit = (values: any) => {
    // Simulated API call
    // setTimeout(() => {
    //   showToast("success", "Contribution submitted successfully!");
    //   dispatch(
    //     addNotification({
    //       id: Date.now(),
    //       message: "New contribution added",
    //       type: "info",
    //       read: false,
    //     })
    //   );
    // }, 1000);

    const contributions = useSelector((state: any) => state.contributions.list);
    // const dispatch = useDispatch();

    const errors = validateContribution(contributions, values);

    if (errors.length > 0) {
      errors.forEach((error) => showToast("error", error));
      return;
    }

    // Proceed with submission if no errors
    dispatch(addContribution(values));
    showToast("success", "Contribution submitted successfully!");
  };

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
