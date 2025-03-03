import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ContributionData {
  date: string;
  amount: string | number; // Update this to match your data type
  // Add other fields here if you need them
}

const ContributionChart = ({ data }: { data: ContributionData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#1890ff"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ContributionChart;
