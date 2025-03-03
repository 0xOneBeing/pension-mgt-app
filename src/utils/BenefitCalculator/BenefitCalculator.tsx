export const calculateBenefitProjection = (contributions: any[]) => {
  const totalContributions = contributions.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  const projectedGrowth = totalContributions * 1.05; // Assuming 5% annual growth rate

  return {
    totalContributions,
    projectedGrowth,
  };
};
