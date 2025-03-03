export const validateContribution = (
  contributions: any[],
  newContribution: any
) => {
  const errors: string[] = [];

  // Rule 1: Only one mandatory contribution per month
  if (newContribution.type === "mandatory") {
    const hasMandatory = contributions.some(
      (c) =>
        c.type === "mandatory" &&
        new Date(c.date).getMonth() ===
          new Date(newContribution.date).getMonth() &&
        new Date(c.date).getFullYear() ===
          new Date(newContribution.date).getFullYear()
    );

    if (hasMandatory) {
      errors.push("Only one mandatory contribution is allowed per month.");
    }
  }

  // Rule 2: Contribution amount must be a decimal
  if (isNaN(newContribution.amount) || newContribution.amount <= 0) {
    errors.push("Contribution amount must be a valid decimal number.");
  }

  // Rule 3: Users cannot select a future contribution date
  if (new Date(newContribution.date) > new Date()) {
    errors.push("Contribution date cannot be in the future.");
  }

  // Rule 4: Check for duplicate contributions
  const isDuplicate = contributions.some(
    (c) =>
      c.amount === newContribution.amount &&
      c.date === newContribution.date &&
      c.type === newContribution.type
  );

  if (isDuplicate) {
    errors.push("Duplicate contribution detected.");
  }

  return errors;
};
