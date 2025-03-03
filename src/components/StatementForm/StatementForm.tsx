// import { Form, DatePicker, Button } from "antd";
// // import { useState } from "react";
// import dayjs from "dayjs";

// const StatementForm = ({
//   onGenerate,
// }: {
//   onGenerate: (dates: any) => void;
// }) => {
//   const [form] = Form.useForm();
// //   const [dates, setDates] = useState<{
// //     startDate: string;
// //     endDate: string;
// //   } | null>(null);

//   const handleGenerate = (values: any) => {
//     const startDate = dayjs(values.startDate).format("YYYY-MM-DD");
//     const endDate = dayjs(values.endDate).format("YYYY-MM-DD");

//     if (dayjs(startDate).isAfter(dayjs(endDate))) {
//       return alert("Start date cannot be after end date.");
//     }

//     // setDates({ startDate, endDate });
//     onGenerate({ startDate, endDate });
//   };

//   return (
//     <Form form={form} layout="inline" onFinish={handleGenerate}>
//       <Form.Item
//         label="Start Date"
//         name="startDate"
//         rules={[{ required: true, message: "Required" }]}
//       >
//         <DatePicker format="YYYY-MM-DD" />
//       </Form.Item>

//       <Form.Item
//         label="End Date"
//         name="endDate"
//         rules={[{ required: true, message: "Required" }]}
//       >
//         <DatePicker format="YYYY-MM-DD" />
//       </Form.Item>

//       <Button type="primary" htmlType="submit">
//         Generate Statement
//       </Button>
//     </Form>
//   );
// };

// export default StatementForm;

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
