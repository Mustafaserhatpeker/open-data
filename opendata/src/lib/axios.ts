import axios from 'axios';
import qs from "qs";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: "repeat" }),
  withCredentials: true,
})