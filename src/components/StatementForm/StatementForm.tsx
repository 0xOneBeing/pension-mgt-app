import { Form, DatePicker, Button } from "antd";
import dayjs from "dayjs";

interface DateRange {
  startDate: string;
  endDate: string;
}

interface StatementFormProps {
  onGenerate: (dates: DateRange) => void;
}

const StatementForm: React.FC<StatementFormProps> = ({ onGenerate }) => {
  const [form] = Form.useForm();

  const handleGenerate = (values: {
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
  }) => {
    const startDate = values.startDate.format("YYYY-MM-DD");
    const endDate = values.endDate.format("YYYY-MM-DD");

    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      return alert("Start date cannot be after end date.");
    }

    onGenerate({ startDate, endDate });
  };

  return (
    <Form form={form} layout="inline" onFinish={handleGenerate}>
      <Form.Item
        label="Start Date"
        name="startDate"
        rules={[{ required: true, message: "Required" }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        label="End Date"
        name="endDate"
        rules={[{ required: true, message: "Required" }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Generate Statement
      </Button>
    </Form>
  );
};

export default StatementForm;
