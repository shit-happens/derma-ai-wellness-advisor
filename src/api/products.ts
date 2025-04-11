import axios from "axios";
import { Product, Prescription } from "@/utils/types";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getProducts = async (prescriptions: Prescription[]): Promise<Product[]> => {
  const response = await API.post("/get_products", prescriptions);
  return response.data;
};