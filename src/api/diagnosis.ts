import axios from "axios";
import { UserInfo } from "@/utils/types";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getDiagnosis = async (userInfo: UserInfo) => {
  const payload: UserInfo = {
    age: userInfo.age,
    gender: userInfo.gender,
    condition: userInfo.condition,
    medications: userInfo.medications?.trim() || "None"
  };

  const response = await API.post("/diagnose", payload);
  return response.data;
};
