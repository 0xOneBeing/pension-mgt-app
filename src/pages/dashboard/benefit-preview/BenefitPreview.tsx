import { Card } from "antd";
import { useSelector } from "react-redux";
import { calculateBenefitProjection } from "../../../utils/BenefitCalculator/BenefitCalculator";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import BenefitCalculator from "../../../components/BenefitCalculator/BenefitCalculator";
import { RootState } from "../../../store";
const BenefitPreview = () => {
  const contributions = useSelector(
    (state: RootState) => state.contributions.list
  );
  const { totalContributions, projectedGrowth } =
    calculateBenefitProjection(contributions);

  return (
    <DashboardLayout>
      <Card title="Benefit Projection">
        <p>Total Contributions: ${totalContributions.toFixed(2)}</p>
        <p>Projected Growth (5% per year): ${projectedGrowth.toFixed(2)}</p>
        <BenefitCalculator />
      </Card>
    </DashboardLayout>
  );
};

export default BenefitPreview;
