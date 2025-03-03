import axios from "axios";

const API_BASE_URL = "https://api.example.com"; // Replace with actual API endpoint

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
