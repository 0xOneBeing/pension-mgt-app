import { useState } from "react";
import { Input, Button, Select, Card } from "antd";
import { Line } from "react-chartjs-2";

const { Option } = Select;

const BenefitCalculator = () => {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [years, setYears] = useState(20);
  const [interestRate, setInterestRate] = useState(5);
  const [futureValue, setFutureValue] = useState(0);
  const [chartData, setChartData] = useState<any>(null);

  const calculateBenefit = () => {
    const n = 12;
    const r = interestRate / 100;
    const t = years;

    let total = 0;
    const yearlyData = [];

    for (let i = 1; i <= t; i++) {
      total = (total + monthlyContribution * 12) * (1 + r / n) ** n;
      yearlyData.push(total);
    }

    setFutureValue(total);
    setChartData({
      labels: Array.from({ length: t }, (_, i) => `Year ${i + 1}`),
      datasets: [
        {
          label: "Projected Pension Balance",
          data: yearlyData,
          borderColor: "#1890ff",
          backgroundColor: "rgba(24, 144, 255, 0.2)",
          fill: true,
        },
      ],
    });
  };

  return (
    <Card title="Benefit Projection Calculator">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label>Monthly Contribution (₦):</label>
          <Input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col">
          <label>Years Until Retirement:</label>
          <Input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col">
          <label>Expected Annual Return (%):</label>
          <Select
            value={interestRate}
            onChange={(value) => setInterestRate(value)}
          >
            <Option value={3}>3%</Option>
            <Option value={5}>5%</Option>
            <Option value={7}>7%</Option>
          </Select>
        </div>

        <Button type="primary" onClick={calculateBenefit}>
          Calculate
        </Button>

        {futureValue > 0 && (
          <div className="mt-4">
            <h3>
              Projected Pension Balance:{" "}
              <span className="text-green-600 font-bold">
                ₦{futureValue.toFixed(2)}
              </span>
            </h3>
          </div>
        )}

        {chartData && (
          <div className="mt-4">
            <Line data={chartData} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default BenefitCalculator;
