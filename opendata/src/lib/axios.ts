import axios from 'axios';
import qs from "qs";
const BaseURL = "http://10.100.9.188:3000/api";

export const axiosInstance = axios.create({
  baseURL: BaseURL,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: "repeat" }),
  withCredentials: true,
})