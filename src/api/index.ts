// axios
import axios from "axios";
import { APIConfiguration } from "../config/api.config";

export const apiInstance = axios.create({
  baseURL: APIConfiguration.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
