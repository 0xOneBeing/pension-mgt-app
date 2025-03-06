import { Card, List, Typography } from "antd";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

const { Title: AntTitle, Text } = Typography;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const recentTransactions = [
    { date: "Feb 20, 2025", amount: "₦50,000", type: "Mandatory" },
    { date: "Jan 15, 2025", amount: "₦30,000", type: "Voluntary" },
    { date: "Dec 10, 2024", amount: "₦45,000", type: "Mandatory" },
    { date: "Nov 05, 2024", amount: "₦25,000", type: "Voluntary" },
    { date: "Oct 25, 2024", amount: "₦40,000", type: "Mandatory" },
  ];

  const contributionsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Contributions (₦)",
        data: [50000, 60000, 55000, 70000, 65000, 80000, 75000],
        borderColor: "#4BB543",
        backgroundColor: "rgba(75, 181, 67, 0.2)",
        fill: true,
      },
    ],
  };

  const benefitsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Benefits Paid (₦)",
        data: [20000, 25000, 30000, 35000, 40000, 45000, 50000],
        backgroundColor: "#3498db",
      },
    ],
  };

  const projectionsData = {
    labels: ["2024", "2025", "2026", "2027", "2028"],
    datasets: [
      {
        label: "Projected Contributions (₦)",
        data: [500000, 600000, 700000, 800000, 900000],
        borderColor: "#FFA500",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        fill: true,
      },
    ],
  };

  const claimsVsBenefitsData = {
    labels: ["Claims", "Benefits"],
    datasets: [
      {
        label: "Amount (₦)",
        data: [300000, 500000],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const monthlyContributionsData = {
    labels: ["Mandatory", "Voluntary"],
    datasets: [
      {
        label: "Amount (₦)",
        data: [700000, 300000],
        backgroundColor: ["#4BB543", "#3498db"],
        hoverBackgroundColor: ["#4BB543", "#3498db"],
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row items-stretch justify-between">
        <div className="w-full lg:w-1/3 h-full">
          <Card className="col-span-1">
            <AntTitle level={4}>Monthly Contributions Breakdown</AntTitle>
            <Doughnut data={monthlyContributionsData} />
          </Card>
        </div>

        <div className="w-full lg:w-1/3 h-full">
          <Card className="col-span-1">
            <AntTitle level={4}>Claims vs. Benefits</AntTitle>
            <Pie data={claimsVsBenefitsData} />
          </Card>
        </div>

        <div className="w-full lg:w-1/2 h-full">
          <Card className="col-span-2">
            <AntTitle level={4}>Contribution Summary</AntTitle>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-3">
          <AntTitle level={4}>Projections for Future Contributions</AntTitle>
          <Line data={projectionsData} />
        </Card>

        <Card className="col-span-3">
          <AntTitle level={4}>Contributions Over Time</AntTitle>
          <Line data={contributionsData} />
        </Card>

        <Card className="col-span-3">
          <AntTitle level={4}>Benefits Paid</AntTitle>
          <Bar data={benefitsData} />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
