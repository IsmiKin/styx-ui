import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_URL || `http://localhost:8000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const runDeadCodeReport = (reportPayload) => {
  return apiClient.post("/scan-project/file-imports", reportPayload);
};
