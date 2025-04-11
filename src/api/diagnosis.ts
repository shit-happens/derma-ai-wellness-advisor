import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getDiagnosis = async (userInfo: {
  age: number;
  gender: string;
  condition: string;
  medications: string:
}) => {
  const response = await API.post("/diagnose", userInfo);
  return response.data;
};
