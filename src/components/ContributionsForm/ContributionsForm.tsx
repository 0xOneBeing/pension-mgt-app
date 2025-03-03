import { Form, Input, Button, Select, DatePicker, message } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { RuleObject } from "rc-field-form/es/interface"; // Correct import path

const { Option } = Select;

interface ContributionFormValues {
  type: "Mandatory" | "Voluntary";
  amount: number;
  date: dayjs.Dayjs;
}

interface ContributionFormProps {
  onSubmit: (values: ContributionFormValues) => void;
}

const ContributionForm = ({ onSubmit }: ContributionFormProps) => {
  const [form] = Form.useForm();
  const [contributions, setContributions] = useState<
    { date: string; type: "Mandatory" | "Voluntary" }[]
  >([]);

  // const validateContribution = (_: any, value: string) => {
  //   if (!/^\d+(\.\d{1,2})?$/.test(value)) {
  //     return Promise.reject(
  //       new Error("Enter a valid amount (e.g., 1000 or 1000.50)")
  //     );
  //   }
  //   return Promise.resolve();
  // };

  // const validateContribution: Rule["validator"] = (_, value: string) => {
  //   if (!/^\d+(\.\d{1,2})?$/.test(value)) {
  //     return Promise.reject(
  //       new Error("Enter a valid amount (e.g., 1000 or 1000.50)")
  //     );
  //   }
  //   return Promise.resolve();
  // };

  const validateContribution = (_: RuleObject, value: string) => {
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      return Promise.reject(
        new Error("Enter a valid amount (e.g., 1000 or 1000.50)")
      );
    }
    return Promise.resolve();
  };

  const handleSubmit = (values: ContributionFormValues) => {
    const { date, type } = values;
    const formattedDate = dayjs(date).format("YYYY-MM");

    // Check for duplicate Mandatory contributions in the same month
    if (
      type === "Mandatory" &&
      contributions.some(
        (c) => c.date === formattedDate && c.type === "Mandatory"
      )
    ) {
      message.error("Only one Mandatory contribution is allowed per month.");
      return;
    }

    setContributions([...contributions, { date: formattedDate, type }]);
    onSubmit(values);
    form.resetFields();
    message.success("Contribution added successfully!");
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Contribution Type"
        name="type"
        rules={[{ required: true, message: "Please select a type" }]}
      >
        <Select placeholder="Select Type">
          <Option value="Mandatory">Mandatory</Option>
          <Option value="Voluntary">Voluntary</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Amount (₦)"
        name="amount"
        rules={[
          { required: true, message: "Please enter amount" },
          { validator: validateContribution },
        ]}
      >
        <Input placeholder="Enter amount" />
      </Form.Item>

      <Form.Item
        label="Contribution Date"
        name="date"
        rules={[
          { required: true, message: "Please select a date" },
          () => ({
            validator(_, value) {
              if (!value) return Promise.resolve();
              if (dayjs(value).isAfter(dayjs())) {
                return Promise.reject(
                  new Error("Future dates are not allowed")
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <DatePicker picker="month" format="YYYY-MM" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        Submit Contribution
      </Button>
    </Form>
  );
};

export default ContributionForm;
