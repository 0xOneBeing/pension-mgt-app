import apiClient from "./apiClient";
import { Contribution } from "../features/contribution/contributionSlice";

export const fetchContributions = async (): Promise<Contribution[]> => {
  const response = await apiClient.get<Contribution[]>("/contributions");
  return response.data;
};


export const addContribution = async (
  contribution: Omit<Contribution, "id" | "type" | "status">
): Promise<Contribution> => {
  const response = await apiClient.post<Contribution>(
    "/contributions",
    contribution
  );
  return response.data;
};

export const updateContribution = async (
  id: number,
  contribution: Partial<Omit<Contribution, "id">>
): Promise<Contribution> => {
  const response = await apiClient.put<Contribution>(
    `/contributions/${id}`,
    contribution
  );
  return response.data;
};

export const deleteContribution = async (id: number): Promise<void> => {
  // await apiClient.delete(`/contributions/${id}`);y
  const response = await apiClient.delete(`/contributions/${id}`);
  return response.data;
};
