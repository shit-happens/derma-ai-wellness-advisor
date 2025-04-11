import axios from "axios";
import { DiagnosisResult, Prescription } from "@/utils/types";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getPrescriptions = async (diagnosis: DiagnosisResult): Promise<Prescription[]> => {
  const response = await API.post("/get_prescription", diagnosis);
  return response.data;
};