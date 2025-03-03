import apiClient from "./apiClient";

export const fetchContributions = async () => {
  const response = await apiClient.get("/contributions");
  return response.data;
};

export const addContribution = async (contribution: any) => {
  const response = await apiClient.post("/contributions", contribution);
  return response.data;
};

export const updateContribution = async (id: string, contribution: any) => {
  const response = await apiClient.put(`/contributions/${id}`, contribution);
  return response.data;
};

export const deleteContribution = async (id: string) => {
  const response = await apiClient.delete(`/contributions/${id}`);
  return response.data;
};

// export const fetchUsers = async () => {
//   const response = await apiClient.get("/users");
//   return response.data;
// };

// export const addUser = async (user: any) => {
//   const response = await apiClient.post("/users", user);
//   return response.data;
// };

// export const updateUser = async (id: string, user: any) => {
//   const response = await apiClient.put(`/users/${id}`, user);
//   return response.data;
// };
